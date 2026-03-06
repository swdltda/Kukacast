import { motion } from '@/utils/framer-motion';
import type { Workshop } from '@/types/dominio';
import { Link } from 'react-router';

export function CardWorkshop({ workshop }: { workshop: Workshop }) {
  return (
    <motion.article whileHover={{ y: -6 }} className="glass-card group rounded-3xl p-5 transition duration-300 hover:border-orange-200/45 hover:shadow-2xl hover:shadow-black/35">
      <p className="text-xs uppercase tracking-[0.16em] text-orange-200/80">Workshop</p>
      <h3 className="mt-2 text-2xl font-semibold leading-tight text-orange-50">{workshop.titulo}</h3>
      <p className="mt-2 text-sm text-orange-100/65">{new Date(workshop.data_evento).toLocaleDateString('pt-BR')} • {workshop.local}</p>
      <p className="mt-4 text-sm text-orange-100/85">{workshop.descricao}</p>
      <span className="mt-4 inline-flex rounded-full border border-orange-200/25 px-3 py-1 text-xs text-orange-100/75">Status: {workshop.status}</span>
      <Link className="mt-5 inline-flex items-center text-sm font-semibold text-orange-300" to={`/workshop/${workshop.slug}`}>
        Ver workshop →
      </Link>
    </motion.article>
  );
}
