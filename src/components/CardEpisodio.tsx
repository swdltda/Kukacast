import { motion } from '@/utils/framer-motion';
import type { Episodio } from '@/types/dominio';
import { Link } from 'react-router';

export function CardEpisodio({ episodio }: { episodio: Episodio }) {
  return (
    <motion.article whileHover={{ y: -6 }} className="glass-card group rounded-3xl p-4 transition duration-300 hover:border-orange-200/50 hover:shadow-2xl hover:shadow-black/35">
      <div className="overflow-hidden rounded-2xl">
        <img src={episodio.thumbnail} alt={episodio.titulo} className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.17em] text-orange-200/80">Episódio · {episodio.mes}</p>
      <h3 className="mt-2 text-lg font-semibold leading-snug text-orange-50">{episodio.titulo}</h3>
      <p className="mt-2 text-sm text-orange-100/70">{episodio.tema}</p>
      <Link className="mt-5 inline-flex items-center text-sm font-semibold text-orange-300" to={`/episodio/${episodio.slug}`}>
        Assistir e ouvir →
      </Link>
    </motion.article>
  );
}
