import { createContext, useEffect, useMemo, useState } from 'react';
import type { AuthSession, AuthUser } from '@/integrations/supabase/cliente';
import {
  cadastrarComEmailSenha,
  loginComEmailSenha,
  logoutAuth,
  obterSessaoAtual,
  onAuthStateChange,
  sincronizarPerfil,
  type DadosCadastro,
} from '@/services/authService';
import type { Usuario } from '@/types/dominio';
import { ADMIN_ALPHA_EMAIL, ADMIN_ALPHA_ID } from '@/services/adminService';

interface AuthContexto {
  usuarioAuth: AuthUser | null;
  perfil: Usuario | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, senha: string) => Promise<Usuario | null>;
  cadastro: (dados: DadosCadastro) => Promise<{ requerConfirmacaoEmail: boolean }>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContexto | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuarioAuth, setUsuarioAuth] = useState<AuthUser | null>(null);
  const [perfil, setPerfil] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  async function hydrateFromSession(session: AuthSession | null) {
    if (!session?.user) {
      setUsuarioAuth(null);
      setPerfil(null);
      return;
    }

    setUsuarioAuth(session.user);
    const perfilSincronizado = await sincronizarPerfil(session.user);
    setPerfil(perfilSincronizado);
    return perfilSincronizado;
  }

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      try {
        const { data } = await obterSessaoAtual();
        if (!mounted) return;
        await hydrateFromSession(data.session);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    bootstrap();

    const { data } = onAuthStateChange(async (session) => {
      if (!mounted) return;
      await hydrateFromSession(session);
      setLoading(false);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContexto>(
    () => ({
      usuarioAuth,
      perfil,
      loading,
      isAdmin:
        perfil?.tipo_usuario === 'admin' ||
        (usuarioAuth?.id === ADMIN_ALPHA_ID && usuarioAuth?.email?.trim().toLowerCase() === ADMIN_ALPHA_EMAIL),
      login: async (email, senha) => {
        setLoading(true);
        try {
          const { data } = await loginComEmailSenha(email, senha);
          return await hydrateFromSession(data.session);
        } finally {
          setLoading(false);
        }
      },
      cadastro: async (dados) => {
        setLoading(true);
        try {
          const { data } = await cadastrarComEmailSenha(dados);
          await hydrateFromSession(data.session);
          return { requerConfirmacaoEmail: !data.session };
        } finally {
          setLoading(false);
        }
      },
      logout: async () => {
        setLoading(true);
        try {
          await logoutAuth();
          setUsuarioAuth(null);
          setPerfil(null);
        } finally {
          setLoading(false);
        }
      },
    }),
    [loading, perfil, usuarioAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
