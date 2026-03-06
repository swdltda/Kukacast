import { useEffect, useState } from 'react';
import { CardEpisodio } from '@/components/CardEpisodio';
import { listarEpisodios } from '@/services/api';
import type { Episodio } from '@/types/dominio';

export function EpisodiosPage() {
  const [episodios, setEpisodios] = useState<Episodio[]>([]);
  useEffect(() => void listarEpisodios().then(setEpisodios), []);

  return <section><h1 className="mb-4 text-3xl font-bold">Episódios</h1><div className="grid gap-4 md:grid-cols-3">{episodios.map((ep) => <CardEpisodio key={ep.id} episodio={ep} />)}</div></section>;
}
