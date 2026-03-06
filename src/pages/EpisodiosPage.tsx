import { useEffect, useState } from 'react';
import { CardEpisodio } from '@/components/CardEpisodio';
import { listarEpisodios } from '@/services/api';
import type { Episodio } from '@/types/dominio';

export function EpisodiosPage() {
  const [episodios, setEpisodios] = useState<Episodio[]>([]);
  useEffect(() => void listarEpisodios().then(setEpisodios), []);

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-3xl font-black">Episódios</h1>
        <p className="mt-1 text-zinc-400">Conteúdos em vídeo e podcast sobre comunicação e tecnologia.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{episodios.map((ep) => <CardEpisodio key={ep.id} episodio={ep} />)}</div>
    </section>
  );
}
