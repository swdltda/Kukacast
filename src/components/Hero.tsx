import { Link } from 'react-router';

export function Hero() {
  return (
    <section className="painel-vidro animar-subida relative overflow-hidden rounded-3xl p-8 md:p-12">
      <div className="absolute -right-24 -top-20 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-amber-300/10 blur-3xl" />

      <div className="relative max-w-3xl">
        <p className="mb-3 inline-flex rounded-full border border-orange-300/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-200">
          Plataforma Institucional
        </p>
        <h1 className="text-4xl font-black leading-tight md:text-6xl">Kuka Cast</h1>
        <p className="mt-4 text-lg text-orange-200 md:text-xl">Comunicação, Tecnologia e Letramento Digital</p>
        <p className="mt-5 max-w-2xl text-zinc-300 md:text-lg">
          Projeto de educação digital que conecta podcast, workshops e formação tecnológica para ampliar oportunidades e pensamento crítico.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/episodios" className="destaque-laranja rounded-xl px-5 py-3 text-sm font-bold transition hover:brightness-110">Assistir episódios</Link>
          <Link to="/workshops" className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:border-orange-300/60 hover:bg-white/5">Participar de workshop</Link>
        </div>
      </div>
    </section>
  );
}
