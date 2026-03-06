import { Link } from 'react-router';

export function Hero() {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-orange-900/70 to-zinc-900 p-10">
      <h1 className="text-5xl font-black">Kuka Cast</h1>
      <p className="mt-4 text-xl text-orange-200">Comunicação, Tecnologia e Letramento Digital</p>
      <p className="mt-4 max-w-3xl text-zinc-200">
        Projeto de educação digital que conecta podcast, workshops e formação tecnológica.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link to="/episodios" className="rounded bg-orange-500 px-5 py-3 font-semibold text-black">Assistir episódios</Link>
        <Link to="/workshops" className="rounded border border-orange-300 px-5 py-3 font-semibold">Participar de workshop</Link>
      </div>
    </section>
  );
}
