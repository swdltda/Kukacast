import type { Workshop } from '@/types/dominio';
import { Link } from 'react-router';

export function CardWorkshop({ workshop }: { workshop: Workshop }) {
  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <h3 className="font-semibold">{workshop.titulo}</h3>
      <p className="mt-1 text-sm text-zinc-400">{new Date(workshop.data_evento).toLocaleDateString('pt-BR')} • {workshop.local}</p>
      <p className="mt-2 text-sm">{workshop.descricao}</p>
      <Link className="mt-3 inline-block text-sm text-orange-300" to={`/workshop/${workshop.slug}`}>Ver workshop</Link>
    </article>
  );
}
