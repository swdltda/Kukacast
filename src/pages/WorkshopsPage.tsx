import { useEffect, useState } from 'react';
import { CardWorkshop } from '@/components/CardWorkshop';
import { listarWorkshops } from '@/services/api';
import type { Workshop } from '@/types/dominio';

export function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  useEffect(() => void listarWorkshops().then(setWorkshops), []);

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-3xl font-black">Workshops</h1>
        <p className="mt-1 text-zinc-400">Formações práticas com inscrição integrada ao Kuka Cast.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">{workshops.map((wk) => <CardWorkshop key={wk.id} workshop={wk} />)}</div>
    </section>
  );
}
