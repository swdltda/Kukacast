import { useEffect, useState } from 'react';
import { CardWorkshop } from '@/components/CardWorkshop';
import { listarWorkshops } from '@/services/api';
import type { Workshop } from '@/types/dominio';

export function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  useEffect(() => void listarWorkshops().then(setWorkshops), []);
  return <section><h1 className="mb-4 text-3xl font-bold">Workshops</h1><div className="grid gap-4 md:grid-cols-2">{workshops.map((wk) => <CardWorkshop key={wk.id} workshop={wk} />)}</div></section>;
}
