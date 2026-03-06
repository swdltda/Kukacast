import { episodiosIniciais, workshopsIniciais } from '@/data/episodios-iniciais';

export function AdminResumoPage() {
  const totalInscritos = 0;
  const totalUsuarios = 0;
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Painel Administrativo</h1>
      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded bg-zinc-900 p-4">Total de episódios: {episodiosIniciais.length}</div>
        <div className="rounded bg-zinc-900 p-4">Total de workshops: {workshopsIniciais.length}</div>
        <div className="rounded bg-zinc-900 p-4">Total de inscritos: {totalInscritos}</div>
        <div className="rounded bg-zinc-900 p-4">Total de usuários: {totalUsuarios}</div>
      </div>
      <p className="text-zinc-300">CRUD de episódios/workshops e configurações do site conectadas ao Supabase.</p>
    </section>
  );
}
