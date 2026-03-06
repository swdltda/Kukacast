create extension if not exists "pgcrypto";

create table if not exists usuarios (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text unique not null,
  telefone text not null,
  data_nascimento date not null,
  cidade text not null,
  tipo_usuario text not null default 'participante' check (tipo_usuario in ('admin', 'participante')),
  data_cadastro timestamptz not null default now()
);

create table if not exists episodios (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  slug text unique not null,
  descricao text not null,
  mes text not null,
  tema text not null,
  youtube_url text not null,
  spotify_url text not null,
  thumbnail text not null,
  data_publicacao date not null,
  status text not null default 'publicado' check (status in ('publicado', 'rascunho'))
);

create table if not exists convidados (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  cargo text not null,
  instituicao text not null,
  foto text not null,
  bio text not null
);

create table if not exists episodio_convidados (
  id uuid primary key default gen_random_uuid(),
  episodio_id uuid not null references episodios(id) on delete cascade,
  convidado_id uuid not null references convidados(id) on delete cascade
);

create table if not exists workshops (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  slug text unique not null,
  descricao text not null,
  data_evento date not null,
  local text not null,
  episodio_relacionado uuid references episodios(id),
  video_gravacao text,
  material_pdf text,
  status text not null default 'aberto' check (status in ('aberto', 'encerrado'))
);

create table if not exists inscricoes_workshop (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references usuarios(id) on delete cascade,
  workshop_id uuid not null references workshops(id) on delete cascade,
  data_inscricao timestamptz not null default now(),
  presenca boolean not null default false,
  unique (usuario_id, workshop_id)
);

create table if not exists configuracoes_site (
  id uuid primary key default gen_random_uuid(),
  chave text unique not null,
  valor text not null,
  descricao text,
  atualizado_em timestamptz not null default now()
);

-- usuário auth para painel admin (criar no Supabase Auth): admin@kukacast.com / 123456
