import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
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
      <div className="section-card space-y-2">
        <h1 className="text-3xl font-bold">{workshop.titulo}</h1>
        <p className="text-zinc-300">{workshop.descricao}</p>
        <p className="text-sm text-zinc-400"><strong>Data:</strong> {new Date(workshop.data_evento).toLocaleDateString('pt-BR')}</p>
        <p className="text-sm text-zinc-400"><strong>Local:</strong> {workshop.local}</p>
        {episodioRelacionado && <p className="text-sm text-zinc-400"><strong>Episódio relacionado:</strong> {episodioRelacionado.titulo}</p>}
        <div className="flex flex-wrap gap-4 pt-2 text-sm font-semibold text-orange-300">
          {workshop.material_pdf && <a href={workshop.material_pdf}>Material complementar</a>}
          {workshop.video_gravacao && <a href={workshop.video_gravacao}>Vídeo da gravação</a>}
        </div>
      </div>
      <FormularioInscricao workshopId={workshop.id} />
    </section>
  );
}
