import { motion } from '@/utils/framer-motion';
import type { Episodio } from '@/types/dominio';
import { Link } from 'react-router';

export function CardEpisodio({ episodio }: { episodio: Episodio }) {
  return (
    <motion.article whileHover={{ y: -4 }} className="glass-card group rounded-2xl p-4 transition duration-300 hover:border-orange-300/45 hover:shadow-xl hover:shadow-black/30">
      <div className="overflow-hidden rounded-xl">
        <img src={episodio.thumbnail} alt={episodio.titulo} className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.16em] text-orange-200/80">Episódio</p>
      <h3 className="mt-2 text-lg font-semibold leading-snug">{episodio.titulo}</h3>
      <p className="mt-2 text-sm text-zinc-400">{episodio.tema}</p>
      <Link className="mt-5 inline-flex items-center text-sm font-semibold text-orange-300" to={`/episodio/${episodio.slug}`}>
        Ver episódio →
      </Link>
    </motion.article>
  );
}
