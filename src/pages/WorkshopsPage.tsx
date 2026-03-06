import { useEffect, useState } from 'react';
import { CardWorkshop } from '@/components/CardWorkshop';
import { listarWorkshops } from '@/services/api';
import type { Workshop } from '@/types/dominio';

export function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    void listarWorkshops().then((dados) => {
      setWorkshops(dados);
      setCarregando(false);
    });
  }, []);

  return (
    <section className="space-y-5">
      <header className="section-card">
        <h1 className="text-3xl font-bold">Workshops</h1>
        <p className="mt-2 text-zinc-300">Formações práticas com abordagem moderna para desenvolvimento de competências digitais.</p>
      </header>
      {carregando ? <p className="text-zinc-400">Carregando workshops...</p> : (
        <div className="grid gap-4 md:grid-cols-2">
          {workshops.map((wk) => <CardWorkshop key={wk.id} workshop={wk} />)}
        </div>
      )}
    </section>
  );
}
