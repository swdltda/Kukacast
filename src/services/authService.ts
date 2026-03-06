import { supabase } from '@/integrations/supabase/cliente';
import type { AuthSession, AuthUser } from '@/integrations/supabase/cliente';
import { verificarAcessoAdmin, ADMIN_ALPHA_EMAIL, ADMIN_ALPHA_ID } from '@/services/adminService';
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

  if (resposta.error) throw resposta.error;

  const userId = resposta.data.user?.id;
  if (userId) {
    const isAdminAlpha = userId === ADMIN_ALPHA_ID && dados.email.trim().toLowerCase() === ADMIN_ALPHA_EMAIL;
    await upsertPerfil({
      id: userId,
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      cidade: dados.cidade,
      data_nascimento: dados.data_nascimento,
      tipo_usuario: isAdminAlpha ? 'admin' : 'participante',
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

  const metadata = authUser.user_metadata ?? {};
  const perfilExistente = await buscarPerfilPorId(authUser.id);
  const isAdmin = await verificarAcessoAdmin(authUser.id, authUser.email);

  const basePayload = {
    id: authUser.id,
    nome: String(metadata.nome ?? perfilExistente?.nome ?? authUser.email.split('@')[0] ?? 'Participante'),
    email: authUser.email,
    telefone: String(metadata.telefone ?? perfilExistente?.telefone ?? 'Não informado'),
    cidade: String(metadata.cidade ?? perfilExistente?.cidade ?? 'Não informado'),
    data_nascimento: String(metadata.data_nascimento ?? perfilExistente?.data_nascimento ?? '1900-01-01'),
    tipo_usuario: (isAdmin ? 'admin' : perfilExistente?.tipo_usuario ?? 'participante') as Usuario['tipo_usuario'],
  };

  if (perfilExistente) {
    const precisaAtualizarTipo = perfilExistente.tipo_usuario !== basePayload.tipo_usuario;
    if (!precisaAtualizarTipo) return perfilExistente;
  }

  return upsertPerfil(basePayload);
}

export function onAuthStateChange(callback: (session: AuthSession | null) => Promise<void> | void) {
  return supabase.auth.onAuthStateChange(async (_event, session) => {
    await callback(session);
  });
}
