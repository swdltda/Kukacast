import { Hero } from '@/components/Hero';
import { CardEpisodio } from '@/components/CardEpisodio';
import { CardWorkshop } from '@/components/CardWorkshop';
import { SecaoCTA } from '@/components/SecaoCTA';
import { episodiosIniciais, workshopsIniciais } from '@/data/episodios-iniciais';

function SecaoInfo({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <section className="painel-vidro animar-subida rounded-2xl p-6">
      <h2 className="text-2xl font-bold">{titulo}</h2>
      <p className="mt-2 leading-relaxed text-zinc-300">{texto}</p>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />

      <div className="grid gap-5 md:grid-cols-2">
        <SecaoInfo titulo="Sobre o projeto" texto="O Kuka Cast integra comunicação e tecnologia para promover formação digital acessível, crítica e prática." />
        <SecaoInfo titulo="Felipe Costa" texto="Fundador e educador com foco em inovação social, narrativas digitais e desenvolvimento de comunidades." />
      </div>

      <SecaoInfo titulo="Temporada atual" texto="12 episódios sobre temas essenciais para cidadania digital, criatividade, segurança e oportunidades." />

      <section className="animar-subida space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">Episódios em destaque</h2>
          <span className="text-sm text-zinc-400">Temporada 1</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{episodiosIniciais.slice(0, 6).map((ep) => <CardEpisodio key={ep.id} episodio={ep} />)}</div>
      </section>

      <section className="animar-subida space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">Workshops</h2>
          <span className="text-sm text-zinc-400">Inscrições abertas</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">{workshopsIniciais.map((wk) => <CardWorkshop key={wk.id} workshop={wk} />)}</div>
      </section>

      <section className="painel-vidro animar-subida rounded-2xl p-6">
        <h2 className="text-2xl font-bold">Comunidade Kuka Cast</h2>
        <p className="mt-2 text-zinc-300">Participe do grupo para trocar experiências, receber materiais exclusivos e novidades das próximas turmas.</p>
      </section>

      <SecaoCTA />
    </>
  );
}
