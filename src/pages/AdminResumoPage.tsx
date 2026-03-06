import { episodiosIniciais, workshopsIniciais } from '@/data/episodios-iniciais';

export function AdminResumoPage() {
  const totalInscritos = 0;
  const totalUsuarios = 0;

  return (
    <section className="space-y-6">
      <header className="section-card">
        <p className="text-xs uppercase tracking-[0.16em] text-orange-200/80">Painel institucional</p>
        <h1 className="mt-2 text-3xl font-bold">Gestão Kuka Cast</h1>
        <p className="mt-2 text-zinc-300">
          Acompanhe dados essenciais da operação, conteúdo e comunidade em um ambiente administrativo mais claro e moderno.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="metric-card">
          Total de episódios
          <strong>{episodiosIniciais.length}</strong>
        </div>
        <div className="metric-card">
          Total de workshops
          <strong>{workshopsIniciais.length}</strong>
        </div>
        <div className="metric-card">
          Total de inscritos
          <strong>{totalInscritos}</strong>
        </div>
        <div className="metric-card">
          Total de usuários
          <strong>{totalUsuarios}</strong>
        </div>
      </div>

      <div className="section-card">
        <h2 className="text-xl font-semibold">Próximos passos</h2>
        <p className="mt-2 text-zinc-300">
          CRUD de episódios, workshops e configurações do site já preparado para integração contínua com Supabase.
        </p>
      </div>
    </section>
  );
}
