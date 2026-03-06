export function DashboardAdmin({ episodios, workshops, inscritos, usuarios }: { episodios: number; workshops: number; inscritos: number; usuarios: number; }) {
  return (
    <section className="space-y-5">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-orange-200/70">Admin</p>
        <h1 className="text-3xl font-bold text-orange-50">Visão geral da plataforma</h1>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="metric-card">Total de episódios<strong>{episodios}</strong></div>
        <div className="metric-card">Total de workshops<strong>{workshops}</strong></div>
        <div className="metric-card">Inscrições registradas<strong>{inscritos}</strong></div>
        <div className="metric-card">Usuários cadastrados<strong>{usuarios}</strong></div>
      </div>
    </section>
  );
}
