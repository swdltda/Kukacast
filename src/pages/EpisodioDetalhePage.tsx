import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { PlayerVideo } from '@/components/PlayerVideo';
import { CardEpisodio } from '@/components/CardEpisodio';
import { listarConvidadosPorEpisodio, listarEpisodios, listarWorkshops, obterEpisodioPorSlug } from '@/services/api';
import type { Convidado, Episodio, Workshop } from '@/types/dominio';

export function EpisodioDetalhePage() {
  const { slug = '' } = useParams();
  const [episodio, setEpisodio] = useState<Episodio | null>(null);
  const [relacionados, setRelacionados] = useState<Episodio[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [convidados, setConvidados] = useState<Convidado[]>([]);

  useEffect(() => {
    void obterEpisodioPorSlug(slug).then((ep) => {
      setEpisodio(ep);
      if (!ep) return;
      void listarConvidadosPorEpisodio(ep.id).then(setConvidados);
      void listarEpisodios().then((todos) => setRelacionados(todos.filter((item) => item.id !== ep.id).slice(0, 3)));
      void listarWorkshops().then((wks) => setWorkshops(wks.filter((wk) => wk.episodio_relacionado === ep.id)));
    });
  }, [slug]);

  if (!episodio) return <p>Episódio não encontrado.</p>;

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">{episodio.titulo}</h1>
      <p className="text-zinc-300">{episodio.descricao}</p>
      <p><strong>Tema:</strong> {episodio.tema}</p>
      <PlayerVideo url={episodio.youtube_url} />
      <a className="text-orange-300" href={episodio.spotify_url} target="_blank" rel="noreferrer">Ouvir no Spotify</a>
      <div>
        <h3 className="font-semibold">Convidados relacionados</h3>
        {convidados.length ? (
          <ul className="mt-2 space-y-2 text-zinc-300">{convidados.map((c) => <li key={c.id}>{c.nome} • {c.cargo}</li>)}</ul>
        ) : (
          <p className="text-zinc-400">Sem convidados relacionados cadastrados.</p>
        )}
      </div>
      {workshops.map((wk) => <Link key={wk.id} className="block text-orange-300" to={`/workshop/${wk.slug}`}>Workshop relacionado: {wk.titulo}</Link>)}
      <div className="grid gap-4 md:grid-cols-3">{relacionados.map((ep) => <CardEpisodio key={ep.id} episodio={ep} />)}</div>
    </section>
  );
}
