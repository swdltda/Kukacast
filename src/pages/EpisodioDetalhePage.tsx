import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { PlayerVideo } from '@/components/PlayerVideo';
import { CardEpisodio } from '@/components/CardEpisodio';
import { obterEpisodioPorSlug } from '@/services/api';
import { episodiosIniciais, workshopsIniciais } from '@/data/episodios-iniciais';
import type { Episodio } from '@/types/dominio';

export function EpisodioDetalhePage() {
  const { slug = '' } = useParams();
  const [episodio, setEpisodio] = useState<Episodio | null>(null);
  useEffect(() => void obterEpisodioPorSlug(slug).then(setEpisodio), [slug]);
  if (!episodio) return <p>Episódio não encontrado.</p>;
  const workshopRelacionado = workshopsIniciais.find((wk) => wk.episodio_relacionado === episodio.id);

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">{episodio.titulo}</h1>
      <p className="text-zinc-300">{episodio.descricao}</p>
      <p><strong>Tema:</strong> {episodio.tema}</p>
      <PlayerVideo url={episodio.youtube_url} />
      <a className="text-orange-300" href={episodio.spotify_url} target="_blank" rel="noreferrer">Ouvir no Spotify</a>
      <div><h3 className="font-semibold">Convidados relacionados</h3><p className="text-zinc-400">Convidados serão carregados do relacionamento episodio_convidados.</p></div>
      {workshopRelacionado && <Link className="text-orange-300" to={`/workshop/${workshopRelacionado.slug}`}>Workshop relacionado: {workshopRelacionado.titulo}</Link>}
      <div className="grid gap-4 md:grid-cols-3">{episodiosIniciais.filter((ep) => ep.id !== episodio.id).slice(0, 3).map((ep) => <CardEpisodio key={ep.id} episodio={ep} />)}</div>
    </section>
  );
}
