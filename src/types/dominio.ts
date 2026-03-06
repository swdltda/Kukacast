export type TipoUsuario = 'admin' | 'participante';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  data_nascimento: string;
  cidade: string;
  tipo_usuario: TipoUsuario;
  data_cadastro: string;
}

export interface Episodio {
  id: string;
  titulo: string;
  slug: string;
  descricao: string;
  mes: string;
  tema: string;
  youtube_url: string;
  spotify_url: string;
  thumbnail: string;
  data_publicacao: string;
  status: 'publicado' | 'rascunho';
}

export interface Convidado {
  id: string;
  nome: string;
  cargo: string;
  instituicao: string;
  foto: string;
  bio: string;
}

export interface Workshop {
  id: string;
  titulo: string;
  slug: string;
  descricao: string;
  data_evento: string;
  local: string;
  episodio_relacionado: string | null;
  video_gravacao: string | null;
  material_pdf: string | null;
  status: 'aberto' | 'encerrado';
}

export interface InscricaoWorkshop {
  id: string;
  usuario_id: string;
  workshop_id: string;
  data_inscricao: string;
  presenca: boolean;
}
