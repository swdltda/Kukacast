insert into episodios (titulo, slug, descricao, mes, tema, youtube_url, spotify_url, thumbnail, data_publicacao, status)
values
('Letramento Digital: entender a internet', 'episodio-1', 'Episódio sobre fundamentos da internet.', 'Janeiro', 'Letramento Digital', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://open.spotify.com/', 'https://picsum.photos/seed/kuka-ep-1/640/360', '2025-01-01', 'publicado'),
('Comunicação na Internet', 'episodio-2', 'Episódio sobre comunicação online.', 'Fevereiro', 'Comunicação', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://open.spotify.com/', 'https://picsum.photos/seed/kuka-ep-2/640/360', '2025-02-01', 'publicado'),
('Redes Sociais e Oportunidades', 'episodio-3', 'Episódio sobre redes sociais.', 'Março', 'Redes Sociais', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://open.spotify.com/', 'https://picsum.photos/seed/kuka-ep-3/640/360', '2025-03-01', 'publicado'),
('Criatividade Digital', 'episodio-4', 'Episódio sobre criatividade digital.', 'Abril', 'Criatividade', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://open.spotify.com/', 'https://picsum.photos/seed/kuka-ep-4/640/360', '2025-04-01', 'publicado'),
('Pensamento Crítico na Internet', 'episodio-5', 'Episódio sobre pensamento crítico.', 'Maio', 'Pensamento Crítico', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://open.spotify.com/', 'https://picsum.photos/seed/kuka-ep-5/640/360', '2025-05-01', 'publicado'),
('Fotografia e Território', 'episodio-6', 'Episódio sobre fotografia.', 'Junho', 'Fotografia', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://open.spotify.com/', 'https://picsum.photos/seed/kuka-ep-6/640/360', '2025-06-01', 'publicado'),
('Memória e Narrativa Digital', 'episodio-7', 'Episódio sobre memória digital.', 'Julho', 'Memória', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://open.spotify.com/', 'https://picsum.photos/seed/kuka-ep-7/640/360', '2025-07-01', 'publicado'),
('Segurança Digital', 'episodio-8', 'Episódio sobre segurança digital.', 'Agosto', 'Segurança', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://open.spotify.com/', 'https://picsum.photos/seed/kuka-ep-8/640/360', '2025-08-01', 'publicado'),
('Inteligência Artificial', 'episodio-9', 'Episódio sobre IA.', 'Setembro', 'Inteligência Artificial', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://open.spotify.com/', 'https://picsum.photos/seed/kuka-ep-9/640/360', '2025-09-01', 'publicado'),
('Empreendedorismo Digital', 'episodio-10', 'Episódio sobre empreendedorismo digital.', 'Outubro', 'Empreendedorismo', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://open.spotify.com/', 'https://picsum.photos/seed/kuka-ep-10/640/360', '2025-10-01', 'publicado'),
('Cultura e Identidade Digital', 'episodio-11', 'Episódio sobre cultura digital.', 'Novembro', 'Cultura', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://open.spotify.com/', 'https://picsum.photos/seed/kuka-ep-11/640/360', '2025-11-01', 'publicado'),
('O Futuro da Tecnologia', 'episodio-12', 'Episódio sobre futuro da tecnologia.', 'Dezembro', 'Futuro', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://open.spotify.com/', 'https://picsum.photos/seed/kuka-ep-12/640/360', '2025-12-01', 'publicado');

insert into workshops (titulo, slug, descricao, data_evento, local, episodio_relacionado, status)
select 'Fotografia com celular', 'fotografia-com-celular', 'Práticas de fotografia para redes e território.', '2026-03-15', 'Centro Cultural de Belém', e.id, 'aberto' from episodios e where slug = 'episodio-6'
union all
select 'Produção de conteúdo para redes sociais', 'producao-de-conteudo-para-redes-sociais', 'Planejamento e criação de conteúdo digital.', '2026-04-10', 'Online', e.id, 'aberto' from episodios e where slug = 'episodio-3'
union all
select 'Segurança digital', 'seguranca-digital', 'Proteção de dados, contas e dispositivos.', '2026-05-12', 'Online', e.id, 'aberto' from episodios e where slug = 'episodio-8'
union all
select 'Empreendedorismo digital', 'empreendedorismo-digital', 'Monetização e presença digital.', '2026-06-05', 'Hub Tecnológico', e.id, 'aberto' from episodios e where slug = 'episodio-10'
union all
select 'Comunicação digital', 'comunicacao-digital', 'Linguagem e narrativa para internet.', '2026-07-19', 'Online', e.id, 'aberto' from episodios e where slug = 'episodio-2';

insert into configuracoes_site (chave, valor, descricao)
values
('titulo_home', 'Kuka Cast', 'Título principal da home'),
('subtitulo_home', 'Comunicação, Tecnologia e Letramento Digital', 'Subtítulo principal da home');
