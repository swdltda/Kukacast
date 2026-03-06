import { Hero } from '@/components/Hero';
import { CardEpisodio } from '@/components/CardEpisodio';
import { CardWorkshop } from '@/components/CardWorkshop';
import { SecaoCTA } from '@/components/SecaoCTA';
import { episodiosIniciais, workshopsIniciais } from '@/data/episodios-iniciais';

export function HomePage() {
  return (
    <>
      <Hero />
      <section><h2 className="text-2xl font-bold">Sobre o projeto</h2><p className="text-zinc-300">O Kuka Cast une podcast, workshops e tecnologia para fortalecer o letramento digital.</p></section>
      <section><h2 className="text-2xl font-bold">Felipe Costa</h2><p className="text-zinc-300">Fundador do projeto e educador em comunicação digital.</p></section>
      <section><h2 className="text-2xl font-bold">Temporada atual</h2><p className="text-zinc-300">12 episódios com temas essenciais para cidadania digital.</p></section>
      <section><h2 className="mb-4 text-2xl font-bold">Episódios</h2><div className="grid gap-4 md:grid-cols-3">{episodiosIniciais.slice(0, 6).map((ep) => <CardEpisodio key={ep.id} episodio={ep} />)}</div></section>
      <section><h2 className="mb-4 text-2xl font-bold">Workshops</h2><div className="grid gap-4 md:grid-cols-2">{workshopsIniciais.map((wk) => <CardWorkshop key={wk.id} workshop={wk} />)}</div></section>
      <section><h2 className="text-2xl font-bold">Comunidade</h2><p className="text-zinc-300">Participe do nosso grupo para trocar experiências e receber materiais.</p></section>
      <SecaoCTA />
    </>
  );
}
