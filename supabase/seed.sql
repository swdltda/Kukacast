insert into episodios (titulo, slug, descricao, mes, tema, youtube_url, spotify_url, thumbnail, data_publicacao, status)
values
('Letramento Digital: entender a internet', 'episodio-1', 'Episódio sobre fundamentos da internet.', 'Janeiro', 'Letramento Digital', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://open.spotify.com/', 'https://picsum.photos/seed/kuka-ep-1/640/360', '2025-01-01', 'publicado'),
('Comunicação na Internet', 'episodio-2', 'Episódio sobre comunicação online.', 'Fevereiro', 'Comunicação', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://open.spotify.com/', 'https://picsum.photos/seed/kuka-ep-2/640/360', '2025-02-01', 'publicado'),
('Redes Sociais e Oportunidades', 'episodio-3', 'Episódio sobre redes sociais.', 'Março', 'Redes Sociais', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://open.spotify.com/', 'https://picsum.photos/seed/kuka-ep-3/640/360', '2025-03-01', 'publicado'),
('Criatividade Digital', 'episodio-4', 'Episódio sobre criatividade digital.', 'Abril', 'Criatividade', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://open.spotify.com/', 'https://picsum.photos/seed/kuka-ep-4/640/360', '2025-04-01', 'publicado');

insert into workshops (titulo, slug, descricao, data_evento, local, episodio_relacionado, status)
select 'Fotografia com celular', 'fotografia-com-celular', 'Práticas de fotografia para redes e território.', '2026-03-15', 'Centro Cultural de Belém', e.id, 'aberto' from episodios e where slug = 'episodio-4'
union all
select 'Produção de conteúdo para redes sociais', 'producao-de-conteudo-para-redes-sociais', 'Planejamento e criação de conteúdo digital.', '2026-04-10', 'Online', e.id, 'aberto' from episodios e where slug = 'episodio-3';

insert into configuracoes_site (chave, valor, descricao)
values
('titulo_home', 'Kuka Cast', 'Título principal da home'),
('subtitulo_home', 'Comunicação, Tecnologia e Letramento Digital', 'Subtítulo principal da home'),
('descricao_home', 'Conteúdos e formação prática para fortalecer cidadania digital e inovação cultural.', 'Descrição principal'),
('botao_primario_texto', 'Assistir episódios', 'Texto CTA principal'),
('botao_primario_link', '/episodios', 'Link CTA principal'),
('botao_secundario_texto', 'Participar de workshop', 'Texto CTA secundário'),
('botao_secundario_link', '/workshops', 'Link CTA secundário'),
('imagem_hero', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80', 'Imagem do hero'),
('texto_sobre_projeto', 'O Kuka Cast integra podcast, workshops e tecnologia para fortalecer o letramento digital.', 'Texto institucional'),
('texto_comunidade', 'Participe de encontros, receba materiais e troque experiências com outros participantes.', 'Texto da comunidade')
on conflict (chave) do update set valor = excluded.valor, descricao = excluded.descricao;
