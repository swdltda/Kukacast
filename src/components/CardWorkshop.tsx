import type { Workshop } from '@/types/dominio';
import { Link } from 'react-router';

export function CardWorkshop({ workshop }: { workshop: Workshop }) {
  return (
    <article className="glass-card group rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-300/45 hover:shadow-xl hover:shadow-black/30">
      <p className="text-xs uppercase tracking-[0.16em] text-orange-200/80">Workshop</p>
      <h3 className="mt-2 text-xl font-semibold leading-tight">{workshop.titulo}</h3>
      <p className="mt-2 text-sm text-zinc-400">
        {new Date(workshop.data_evento).toLocaleDateString('pt-BR')} • {workshop.local}
      </p>
      <p className="mt-4 text-sm text-zinc-200/90">{workshop.descricao}</p>
      <Link className="mt-5 inline-flex items-center text-sm font-semibold text-orange-300" to={`/workshop/${workshop.slug}`}>
        Ver workshop →
      </Link>
    </article>
  );
}
