import { useEffect, useState } from 'react';
import { CardEpisodio } from '@/components/CardEpisodio';
import { listarEpisodios } from '@/services/api';
import type { Episodio } from '@/types/dominio';

export function EpisodiosPage() {
  const [episodios, setEpisodios] = useState<Episodio[]>([]);
  useEffect(() => void listarEpisodios().then(setEpisodios), []);

  return (
    <section className="space-y-5">
      <header className="section-card">
        <h1 className="text-3xl font-bold">Episódios</h1>
        <p className="mt-2 text-zinc-300">Uma curadoria de conteúdos para apoiar comunicação consciente, cidadania e inovação digital.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {episodios.map((ep) => (
          <CardEpisodio key={ep.id} episodio={ep} />
        ))}
      </div>
    </section>
  );
}
