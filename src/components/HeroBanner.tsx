import { motion } from '@/utils/framer-motion';
import { Link } from 'react-router';
import type { ConfiguracoesHome } from '@/types/dominio';

export function HeroBanner({ configuracoes }: { configuracoes: ConfiguracoesHome }) {
  return (
    <section className="relative -mt-24 overflow-hidden rounded-3xl border border-white/10">
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
        style={{ backgroundImage: `url(${configuracoes.imagem_hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-[#090b11]" />
      <div className="relative px-6 pb-18 pt-32 sm:px-12 sm:pb-24 sm:pt-36">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-flex rounded-full border border-orange-300/45 bg-orange-900/25 px-4 py-1 text-xs font-semibold tracking-wide text-orange-100">
          Plataforma institucional de educação digital
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          {configuracoes.titulo_home}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="mt-4 max-w-3xl text-base text-zinc-100 sm:text-lg">
          {configuracoes.subtitulo_home}
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-4 max-w-3xl text-sm text-zinc-300 sm:text-base">
          {configuracoes.descricao_home}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }} className="mt-8 flex flex-wrap gap-3 sm:gap-4">
          <Link to={configuracoes.botao_primario_link} className="button-primary px-5 py-3">
            {configuracoes.botao_primario_texto}
          </Link>
          <Link to={configuracoes.botao_secundario_link} className="button-secondary px-5 py-3 text-zinc-100">
            {configuracoes.botao_secundario_texto}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
