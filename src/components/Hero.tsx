import { Link } from 'react-router';

export function Hero() {
  return (
    <section className="section-card relative overflow-hidden p-8 sm:p-12">
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute -bottom-14 left-10 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl" />
      <p className="relative mb-4 inline-flex rounded-full border border-orange-300/45 bg-orange-900/25 px-4 py-1 text-xs font-semibold tracking-wide text-orange-100">
        Plataforma institucional de educação digital
      </p>
      <h1 className="relative text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        Kuka Cast
      </h1>
      <p className="relative mt-4 max-w-3xl text-base text-zinc-200 sm:text-lg">
        Comunicação, tecnologia e letramento digital com experiência premium em conteúdo, comunidade e formação prática.
      </p>
      <div className="relative mt-8 flex flex-wrap gap-3 sm:gap-4">
        <Link to="/episodios" className="button-primary px-5 py-3">
          Assistir episódios
        </Link>
        <Link to="/workshops" className="button-secondary px-5 py-3 text-zinc-100">
          Participar de workshop
        </Link>
      </div>
    </section>
  );
}
