import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { FormularioInscricao } from '@/components/FormularioInscricao';
import { listarEpisodios, obterWorkshopPorSlug } from '@/services/api';
import type { Episodio, Workshop } from '@/types/dominio';

export function WorkshopDetalhePage() {
  const { slug = '' } = useParams();
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [episodioRelacionado, setEpisodioRelacionado] = useState<Episodio | null>(null);

  useEffect(() => {
    void obterWorkshopPorSlug(slug).then((wk) => {
      setWorkshop(wk);
      if (!wk?.episodio_relacionado) return;
      void listarEpisodios().then((eps) => setEpisodioRelacionado(eps.find((ep) => ep.id === wk.episodio_relacionado) ?? null));
    });
  }, [slug]);

  if (!workshop) return <p>Workshop não encontrado.</p>;

  return (
    <section className="space-y-5">
      <header className="section-card space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-orange-200/70">Workshop Kuka Cast</p>
        <h1 className="editorial-title text-3xl font-black text-orange-50 sm:text-4xl">{workshop.titulo}</h1>
        <p className="text-orange-100/80">{workshop.descricao}</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full border border-orange-200/25 px-3 py-1 text-orange-100/80">{new Date(workshop.data_evento).toLocaleDateString('pt-BR')}</span>
          <span className="rounded-full border border-orange-200/25 px-3 py-1 text-orange-100/80">{workshop.local}</span>
          <span className="rounded-full border border-orange-200/25 px-3 py-1 text-orange-100/80">Status: {workshop.status}</span>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="section-card space-y-4">
          <h2 className="text-xl font-semibold text-orange-50">Inscrição</h2>
          <FormularioInscricao workshopId={workshop.id} />
        </div>

        <aside className="space-y-4">
          {episodioRelacionado && (
            <article className="section-card">
              <h3 className="text-lg font-semibold text-orange-50">Relação com episódio</h3>
              <p className="mt-2 text-sm text-orange-100/75">Este workshop aprofunda os temas do episódio:</p>
              <Link className="mt-3 inline-block text-orange-300 hover:underline" to={`/episodio/${episodioRelacionado.slug}`}>
                {episodioRelacionado.titulo}
              </Link>
            </article>
          )}
          <article className="section-card">
            <h3 className="text-lg font-semibold text-orange-50">Materiais</h3>
            <div className="mt-3 flex flex-col gap-2 text-sm text-orange-300">
              {workshop.material_pdf && <a href={workshop.material_pdf}>Material complementar</a>}
              {workshop.video_gravacao && <a href={workshop.video_gravacao}>Vídeo da gravação</a>}
              {!workshop.material_pdf && !workshop.video_gravacao && <p className="text-orange-100/65">Materiais ainda não publicados.</p>}
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
}
