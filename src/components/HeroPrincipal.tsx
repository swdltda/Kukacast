import { motion } from '@/utils/framer-motion';
import { Link } from 'react-router';
import type { ConfiguracoesHome } from '@/types/dominio';

export function HeroPrincipal({ configuracoes }: { configuracoes: ConfiguracoesHome }) {
  return (
    <section className="pattern-wave relative -mt-28 overflow-hidden rounded-[2rem] border border-orange-200/20">
      <div className="absolute inset-0 bg-gradient-to-r from-[#110b09] via-[#29140f] to-[#632f16]" />
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `url(${configuracoes.imagem_hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />

      <div className="relative grid min-h-[68vh] items-center gap-9 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-5">
          <span className="inline-flex rounded-full border border-orange-200/35 bg-orange-950/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.21em] text-orange-100">
            Kuka Cast · Território, Cultura e Futuro
          </span>
          <h1 className="editorial-title max-w-3xl text-4xl leading-tight font-black text-orange-50 sm:text-5xl lg:text-6xl">
            {configuracoes.titulo_home}
          </h1>
          <p className="max-w-2xl text-lg text-orange-50/85">{configuracoes.subtitulo_home}</p>
          <p className="max-w-2xl text-sm text-orange-100/75 sm:text-base">{configuracoes.descricao_home}</p>
          <div className="flex flex-wrap gap-3 pt-3">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link to={configuracoes.botao_primario_link} className="button-primary inline-flex px-6 py-3">
                {configuracoes.botao_primario_texto}
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link to={configuracoes.botao_secundario_link} className="button-secondary inline-flex px-6 py-3">
                {configuracoes.botao_secundario_texto}
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.figure initial={{ opacity: 0, x: 38 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="justify-self-center lg:justify-self-end">
          <img
            src={configuracoes.imagem_hero}
            alt="Ilustração do estúdio do Kuka Cast"
            className="h-[330px] w-[270px] rounded-[2rem] border border-orange-200/25 object-cover shadow-2xl shadow-black/65 sm:h-[420px] sm:w-[340px]"
          />
        </motion.figure>
      </div>
    </section>
  );
}
