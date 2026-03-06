import { supabase } from '@/integrations/supabase/cliente';
import type { AuthSession, AuthUser } from '@/integrations/supabase/cliente';
import { buscarPerfilPorId, upsertPerfil } from '@/services/usuariosService';
import type { Usuario } from '@/types/dominio';

export interface DadosCadastro {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  cidade: string;
  data_nascimento: string;
}

export async function loginComEmailSenha(email: string, senha: string) {
  return supabase.auth.signInWithPassword({ email, password: senha });
}

export async function cadastrarComEmailSenha(dados: DadosCadastro) {
  const resposta = await supabase.auth.signUp({
    email: dados.email,
    password: dados.senha,
    options: {
      data: {
        nome: dados.nome,
        telefone: dados.telefone,
        cidade: dados.cidade,
        data_nascimento: dados.data_nascimento,
      },
    },
  });

  const userId = resposta.data.user?.id;
  if (userId) {
    await upsertPerfil({
      id: userId,
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      cidade: dados.cidade,
      data_nascimento: dados.data_nascimento,
      tipo_usuario: 'participante',
      ativo: true,
    });
  }

  return resposta;
}

export async function logoutAuth() {
  return supabase.auth.signOut();
}

export async function obterSessaoAtual() {
  return supabase.auth.getSession();
}

export async function sincronizarPerfil(authUser: AuthUser | null): Promise<Usuario | null> {
  if (!authUser?.id || !authUser.email) return null;

  const perfil = await buscarPerfilPorId(authUser.id);
  if (perfil) return perfil;

  const metadata = authUser.user_metadata ?? {};
  return upsertPerfil({
    id: authUser.id,
    nome: String(metadata.nome ?? authUser.email.split('@')[0] ?? 'Participante'),
    email: authUser.email,
    telefone: String(metadata.telefone ?? ''),
    cidade: String(metadata.cidade ?? ''),
    data_nascimento: String(metadata.data_nascimento ?? ''),
    tipo_usuario: 'participante',
    ativo: true,
  });
}

export function onAuthStateChange(callback: (session: AuthSession | null) => Promise<void> | void) {
  return supabase.auth.onAuthStateChange(async (_event, session) => {
    await callback(session);
  });
}
