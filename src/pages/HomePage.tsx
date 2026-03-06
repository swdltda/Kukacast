import { Hero } from '@/components/Hero';
import { CardEpisodio } from '@/components/CardEpisodio';
import { CardWorkshop } from '@/components/CardWorkshop';
import { SecaoCTA } from '@/components/SecaoCTA';
import { episodiosIniciais, workshopsIniciais } from '@/data/episodios-iniciais';

export function HomePage() {
  return (
    <>
      <Hero />

      <section className="grid gap-4 md:grid-cols-3">
        <article className="section-card">
          <h2 className="text-xl font-bold">Sobre o projeto</h2>
          <p className="mt-2 text-zinc-300">
            O Kuka Cast integra podcast, workshops e tecnologia para fortalecer o letramento digital de forma acessível e estratégica.
          </p>
        </article>
        <article className="section-card">
          <h2 className="text-xl font-bold">Temporada atual</h2>
          <p className="mt-2 text-zinc-300">12 episódios com temas essenciais para cidadania digital e uso crítico da tecnologia.</p>
        </article>
        <article className="section-card">
          <h2 className="text-xl font-bold">Comunidade ativa</h2>
          <p className="mt-2 text-zinc-300">Participe de encontros, receba materiais e troque experiências com outros participantes.</p>
        </article>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">Episódios em destaque</h2>
          <p className="text-sm text-zinc-400">Conteúdo atualizado</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {episodiosIniciais.slice(0, 6).map((ep) => (
            <CardEpisodio key={ep.id} episodio={ep} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Workshops</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {workshopsIniciais.map((wk) => (
            <CardWorkshop key={wk.id} workshop={wk} />
          ))}
        </div>
      </section>

      <SecaoCTA />
    </>
  );
}
