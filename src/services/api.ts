import { episodiosIniciais, workshopsIniciais } from '@/data/episodios-iniciais';
import { supabaseConfig, supabaseDelete, supabaseInsert, supabaseSelect, supabaseUpdate } from '@/integrations/supabase/cliente';
import type {
  ConfiguracaoSite,
  ConfiguracoesHome,
  Convidado,
  Episodio,
  EpisodioConvidado,
  InscricaoWorkshop,
  Usuario,
  Workshop,
} from '@/types/dominio';

const configuracoesPadrao: ConfiguracoesHome = {
  titulo_home: 'Kuka Cast',
  subtitulo_home: 'Comunicação, Tecnologia e Letramento Digital',
  descricao_home: 'Conteúdos e formação prática para fortalecer a cidadania digital da comunidade.',
  botao_primario_texto: 'Assistir episódios',
  botao_primario_link: '/episodios',
  botao_secundario_texto: 'Participar de workshop',
  botao_secundario_link: '/workshops',
  imagem_hero: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80',
  texto_sobre_projeto: 'O Kuka Cast integra podcast, workshops e tecnologia para fortalecer o letramento digital.',
  texto_comunidade: 'Participe de encontros, receba materiais e troque experiências com outros participantes.',
};

const parserConfiguracoes = (itens: ConfiguracaoSite[]): ConfiguracoesHome => {
  return itens.reduce((acc, item) => ({ ...acc, [item.chave]: item.valor }), configuracoesPadrao);
};

export async function listarEpisodios(): Promise<Episodio[]> {
  if (!supabaseConfig.habilitado) return episodiosIniciais;
  const data = await supabaseSelect<Episodio>('episodios', { orderBy: 'data_publicacao.desc' });
  return data.length ? data : episodiosIniciais;
}

export async function criarEpisodio(payload: Omit<Episodio, 'id'>) {
  return supabaseInsert<Episodio>('episodios', payload);
}

export async function atualizarEpisodio(id: string, payload: Partial<Omit<Episodio, 'id'>>) {
  return supabaseUpdate<Episodio>('episodios', payload, [`id=eq.${id}`]);
}

export async function excluirEpisodio(id: string) {
  return supabaseDelete('episodios', [`id=eq.${id}`]);
}

export async function listarWorkshops(): Promise<Workshop[]> {
  if (!supabaseConfig.habilitado) return workshopsIniciais;
  const data = await supabaseSelect<Workshop>('workshops', { orderBy: 'data_evento.asc' });
  return data.length ? data : workshopsIniciais;
}

export async function criarWorkshop(payload: Omit<Workshop, 'id'>) {
  return supabaseInsert<Workshop>('workshops', payload);
}

export async function atualizarWorkshop(id: string, payload: Partial<Omit<Workshop, 'id'>>) {
  return supabaseUpdate<Workshop>('workshops', payload, [`id=eq.${id}`]);
}

export async function excluirWorkshop(id: string) {
  return supabaseDelete('workshops', [`id=eq.${id}`]);
}

export async function listarUsuarios(): Promise<Usuario[]> {
  if (!supabaseConfig.habilitado) return [];
  return supabaseSelect<Usuario>('usuarios', { orderBy: 'data_cadastro.desc' });
}

export async function listarInscricoes() {
  if (!supabaseConfig.habilitado) return [] as Array<InscricaoWorkshop & { usuario: Usuario; workshop: Workshop }>;
  return supabaseSelect<InscricaoWorkshop & { usuario: Usuario; workshop: Workshop }>('inscricoes_workshop', {
    query: '*, usuario:usuarios(*), workshop:workshops(*)',
    orderBy: 'data_inscricao.desc',
  });
}

export async function listarConvidadosPorEpisodio(episodioId: string): Promise<Convidado[]> {
  if (!supabaseConfig.habilitado) return [];
  const relacoes = await supabaseSelect<EpisodioConvidado>('episodio_convidados', {
    query: '*, convidado:convidados(*)',
    filters: [`episodio_id=eq.${episodioId}`],
  });
  return relacoes.map((r) => r.convidado!).filter(Boolean);
}

export async function obterEpisodioPorSlug(slug: string): Promise<Episodio | null> {
  const episodios = await listarEpisodios();
  return episodios.find((item) => item.slug === slug) ?? null;
}

export async function obterWorkshopPorSlug(slug: string): Promise<Workshop | null> {
  const workshops = await listarWorkshops();
  return workshops.find((item) => item.slug === slug) ?? null;
}

export async function listarConfiguracoesSite() {
  if (!supabaseConfig.habilitado) return [] as ConfiguracaoSite[];
  return supabaseSelect<ConfiguracaoSite>('configuracoes_site');
}

export async function obterConfiguracoesHome(): Promise<ConfiguracoesHome> {
  const itens = await listarConfiguracoesSite();
  return parserConfiguracoes(itens);
}

export async function salvarConfiguracoesHome(configuracoes: ConfiguracoesHome) {
  if (!supabaseConfig.habilitado) return;

  const entradas = Object.entries(configuracoes).map(([chave, valor]) => ({ chave, valor }));
  await Promise.all(
    entradas.map(async ({ chave, valor }) => {
      const itemExistente = await supabaseSelect<ConfiguracaoSite>('configuracoes_site', { filters: [`chave=eq.${chave}`] });
      if (itemExistente.length) {
        await supabaseUpdate<ConfiguracaoSite>('configuracoes_site', { valor, atualizado_em: new Date().toISOString() }, [`chave=eq.${chave}`]);
      } else {
        await supabaseInsert<ConfiguracaoSite>('configuracoes_site', { chave, valor });
      }
    }),
  );
}

export async function listarTabelaGenerica(tabela: string) {
  if (!supabaseConfig.habilitado) return [] as Record<string, unknown>[];
  return supabaseSelect<Record<string, unknown>>(tabela);
}

export async function criarRegistroGenerico(tabela: string, payload: Record<string, unknown>) {
  return supabaseInsert<Record<string, unknown>>(tabela, payload);
}

export async function atualizarRegistroGenerico(tabela: string, id: string, payload: Record<string, unknown>) {
  return supabaseUpdate<Record<string, unknown>>(tabela, payload, [`id=eq.${id}`]);
}

export async function excluirRegistroGenerico(tabela: string, id: string) {
  return supabaseDelete(tabela, [`id=eq.${id}`]);
}

export async function registrarInscricao(dados: Omit<Usuario, 'id' | 'tipo_usuario' | 'data_cadastro' | 'ativo'>, workshopId: string) {
  if (!supabaseConfig.habilitado) {
    return { sucesso: true, mensagem: 'Modo demonstração sem Supabase configurado.' };
  }

  const usuarios = await supabaseSelect<Usuario>('usuarios', { filters: [`email=eq.${dados.email}`] });
  let usuarioId = usuarios[0]?.id;

  if (!usuarioId) {
    const retornoUsuario = await supabaseInsert<Usuario>('usuarios', {
      ...dados,
      telefone: dados.telefone || 'Não informado',
      cidade: dados.cidade || 'Não informado',
      data_nascimento: dados.data_nascimento || '1900-01-01',
      tipo_usuario: 'participante',
    });
    usuarioId = retornoUsuario[0]?.id;
  }

  const inscricaoExistente = await supabaseSelect<InscricaoWorkshop>('inscricoes_workshop', {
    filters: [`usuario_id=eq.${usuarioId}`, `workshop_id=eq.${workshopId}`],
  });

  if (inscricaoExistente.length) {
    return { sucesso: false, mensagem: 'Este e-mail já está inscrito neste workshop.' };
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
