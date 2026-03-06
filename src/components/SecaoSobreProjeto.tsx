import { motion } from '@/utils/framer-motion';

export function SecaoSobreProjeto({ texto }: { texto: string }) {
  return (
    <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-card">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-200/70">Sobre o projeto</p>
      <h3 className="mt-2 text-2xl font-bold text-orange-50">Vozes que conectam cultura e tecnologia</h3>
      <p className="mt-4 text-sm leading-relaxed text-orange-50/80 sm:text-base">{texto}</p>
    </motion.article>
  );
}
