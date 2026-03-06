import { episodiosIniciais, workshopsIniciais } from '@/data/episodios-iniciais';
import { supabaseConfig, supabaseInsert, supabaseSelect } from '@/integrations/supabase/cliente';
import type { Episodio, InscricaoWorkshop, Usuario, Workshop } from '@/types/dominio';

export async function listarEpisodios(): Promise<Episodio[]> {
  if (!supabaseConfig.habilitado) return episodiosIniciais;
  const data = await supabaseSelect<Episodio>('episodios');
  return data.length ? data : episodiosIniciais;
}

export async function listarWorkshops(): Promise<Workshop[]> {
  if (!supabaseConfig.habilitado) return workshopsIniciais;
  const data = await supabaseSelect<Workshop>('workshops');
  return data.length ? data : workshopsIniciais;
}

export async function listarUsuarios(): Promise<Usuario[]> {
  if (!supabaseConfig.habilitado) return [];
  return supabaseSelect<Usuario>('usuarios');
}

export async function obterEpisodioPorSlug(slug: string): Promise<Episodio | null> {
  const episodios = await listarEpisodios();
  return episodios.find((item) => item.slug === slug) ?? null;
}

export async function obterWorkshopPorSlug(slug: string): Promise<Workshop | null> {
  const workshops = await listarWorkshops();
  return workshops.find((item) => item.slug === slug) ?? null;
}

export async function registrarInscricao(dados: Omit<Usuario, 'id' | 'tipo_usuario' | 'data_cadastro'>, workshopId: string) {
  if (!supabaseConfig.habilitado) {
    return { sucesso: true, mensagem: 'Modo demonstração sem Supabase configurado.' };
  }

  const usuarios = await supabaseSelect<Usuario>('usuarios');
  const usuarioExistente = usuarios.find((usuario) => usuario.email === dados.email);

  let usuarioId = usuarioExistente?.id;
  if (!usuarioId) {
    const retornoUsuario = await supabaseInsert<Usuario>('usuarios', { ...dados, tipo_usuario: 'participante' });
    usuarioId = retornoUsuario[0]?.id;
  }

  const payload: Omit<InscricaoWorkshop, 'id'> = {
    usuario_id: usuarioId!,
    workshop_id: workshopId,
    data_inscricao: new Date().toISOString(),
    presenca: false,
  };

  await supabaseInsert<InscricaoWorkshop>('inscricoes_workshop', payload);
  return { sucesso: true, mensagem: 'Inscrição realizada com sucesso.' };
}
