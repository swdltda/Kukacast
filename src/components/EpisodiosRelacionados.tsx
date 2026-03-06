import type { Episodio } from '@/types/dominio';
import { CardEpisodio } from '@/components/CardEpisodio';

export function EpisodiosRelacionados({ episodios }: { episodios: Episodio[] }) {
  if (!episodios.length) return null;
  return (
    <section className="space-y-4">
      <h3 className="text-2xl font-bold text-orange-50">Episódios relacionados</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {episodios.map((ep) => <CardEpisodio key={ep.id} episodio={ep} />)}
      </div>
    </section>
  );
}
