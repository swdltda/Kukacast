import { motion } from '@/utils/framer-motion';
import type { Episodio } from '@/types/dominio';
import { CardEpisodio } from '@/components/CardEpisodio';

export function SecaoOuvirAgora({ episodios }: { episodios: Episodio[] }) {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-orange-200/70">Ouvir agora</p>
          <h2 className="editorial-title text-3xl font-black text-orange-50">Episódios recentes</h2>
        </div>
        <p className="max-w-sm text-sm text-orange-100/65">Conteúdo editorial com visão afro-contemporânea sobre comunicação, território e tecnologia.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {episodios.slice(0, 6).map((ep, index) => (
          <motion.div key={ep.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
            <CardEpisodio episodio={ep} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
