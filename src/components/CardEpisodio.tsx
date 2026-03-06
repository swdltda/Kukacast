import type { Episodio } from '@/types/dominio';
import { Link } from 'react-router';

export function CardEpisodio({ episodio }: { episodio: Episodio }) {
  return (
    <article className="group painel-vidro animar-subida overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:border-orange-300/40">
      <div className="relative">
        <img src={episodio.thumbnail} alt={episodio.titulo} className="h-44 w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs text-orange-200">{episodio.mes}</span>
      </div>
      <div className="space-y-2 p-4">
        <p className="text-xs uppercase tracking-wider text-zinc-400">{episodio.tema}</p>
        <h3 className="line-clamp-2 text-lg font-semibold text-zinc-100">{episodio.titulo}</h3>
        <p className="line-clamp-2 text-sm text-zinc-400">{episodio.descricao}</p>
        <Link className="inline-flex items-center gap-1 text-sm font-semibold text-orange-300 transition group-hover:text-orange-200" to={`/episodio/${episodio.slug}`}>
          Ver episódio <span>→</span>
        </Link>
      </div>
    </article>
  );
}
