import { createContext, useContext, useMemo, useState } from 'react';
import { login, logout, usuarioEhAdmin } from '@/services/autenticacao';

interface AuthContexto {
  autenticado: boolean;
  admin: boolean;
  entrar: (email: string, senha: string) => Promise<void>;
  sair: () => Promise<void>;
}

const AuthContext = createContext<AuthContexto | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [autenticado, setAutenticado] = useState<boolean>(Boolean(localStorage.getItem('kuka-participante-email')));
  const [admin, setAdmin] = useState<boolean>(usuarioEhAdmin());

  const value = useMemo(
    () => ({
      autenticado,
      admin,
      entrar: async (email: string, senha: string) => {
        await login(email, senha);
        setAutenticado(true);
        setAdmin(usuarioEhAdmin());
      },
      sair: async () => {
        await logout();
        setAutenticado(false);
        setAdmin(false);
      },
    }),
    [autenticado, admin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro do AuthProvider');
  return ctx;
}
