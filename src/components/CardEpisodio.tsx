import type { Episodio } from '@/types/dominio';
import { Link } from 'react-router';

export function CardEpisodio({ episodio }: { episodio: Episodio }) {
  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <img src={episodio.thumbnail} alt={episodio.titulo} className="mb-3 h-44 w-full rounded object-cover" />
      <h3 className="font-semibold">{episodio.titulo}</h3>
      <p className="mt-1 text-sm text-zinc-400">{episodio.tema}</p>
      <Link className="mt-3 inline-block text-sm text-orange-300" to={`/episodio/${episodio.slug}`}>Ver episódio</Link>
    </article>
  );
}
