import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { PlayerVideo } from '@/components/PlayerVideo';
import { PlayerSpotifyCard } from '@/components/PlayerSpotifyCard';
import { BlocoConvidados } from '@/components/BlocoConvidados';
import { EpisodiosRelacionados } from '@/components/EpisodiosRelacionados';
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

  const topicos = useMemo(() => (episodio?.tema || '').split(/[;,]/).map((item) => item.trim()).filter(Boolean), [episodio?.tema]);
  const links = useMemo(() => episodio?.descricao.match(/https?:\/\/\S+/g) ?? [], [episodio?.descricao]);

  if (!episodio) return <p>Episódio não encontrado.</p>;

  return (
    <section className="space-y-6">
      <header className="section-card overflow-hidden p-0">
        <img src={episodio.thumbnail} alt={episodio.titulo} className="h-56 w-full object-cover sm:h-72" />
        <div className="space-y-3 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-orange-200/70">Episódio Kuka Cast</p>
          <h1 className="editorial-title text-3xl font-black text-orange-50 sm:text-4xl">{episodio.titulo}</h1>
          <p className="text-orange-100/80">{episodio.descricao}</p>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_0.8fr]">
        <div className="space-y-4">
          <div className="section-card p-3">
            <PlayerVideo url={episodio.youtube_url} />
          </div>
          <BlocoConvidados convidados={convidados} />
        </div>
        <div className="space-y-4">
          <PlayerSpotifyCard url={episodio.spotify_url} />
          <article className="section-card">
            <h3 className="text-xl font-semibold text-orange-50">Tópicos discutidos</h3>
            <ul className="mt-3 space-y-2 text-sm text-orange-100/80">
              {(topicos.length ? topicos : [episodio.tema]).map((topico) => <li key={topico}>• {topico}</li>)}
            </ul>
          </article>
          <article className="section-card">
            <h3 className="text-xl font-semibold text-orange-50">Links discutidos</h3>
            {links.length ? (
              <ul className="mt-3 space-y-2 text-sm text-orange-200">
                {links.map((url) => <li key={url}><a className="underline" href={url} target="_blank" rel="noreferrer">{url}</a></li>)}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-orange-100/70">Não há links explicitamente citados na descrição.</p>
            )}
          </article>
          {!!workshops.length && (
            <article className="section-card">
              <h3 className="text-xl font-semibold text-orange-50">Workshops relacionados</h3>
              <div className="mt-3 space-y-2">
                {workshops.map((wk) => (
                  <Link key={wk.id} className="block text-sm text-orange-300 hover:underline" to={`/workshop/${wk.slug}`}>
                    {wk.titulo}
                  </Link>
                ))}
              </div>
            </article>
          )}
        </div>
      </div>

      <EpisodiosRelacionados episodios={relacionados} />
    </section>
  );
}
