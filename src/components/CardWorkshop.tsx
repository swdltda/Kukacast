import type { Workshop } from '@/types/dominio';
import { Link } from 'react-router';

export function CardWorkshop({ workshop }: { workshop: Workshop }) {
  return (
    <article className="group painel-vidro animar-subida rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-300/40">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-zinc-100">{workshop.titulo}</h3>
        <span className="rounded-full border border-orange-300/30 px-2 py-1 text-xs text-orange-200">{workshop.status}</span>
      </div>
      <p className="text-sm text-zinc-300">{workshop.descricao}</p>
      <p className="mt-3 text-sm text-zinc-400">{new Date(workshop.data_evento).toLocaleDateString('pt-BR')} • {workshop.local}</p>
      <Link className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-300 transition group-hover:text-orange-200" to={`/workshop/${workshop.slug}`}>
        Ver workshop <span>→</span>
      </Link>
    </article>
  );
}
