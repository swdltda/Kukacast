import { episodiosIniciais, workshopsIniciais } from '@/data/episodios-iniciais';

function CardKpi({ titulo, valor }: { titulo: string; valor: number }) {
  return (
    <article className="painel-vidro rounded-2xl p-5">
      <p className="text-sm text-zinc-400">{titulo}</p>
      <p className="mt-2 text-3xl font-black text-orange-200">{valor}</p>
    </article>
  );
}

export function AdminResumoPage() {
  const totalInscritos = 42;
  const totalUsuarios = 28;

  return (
    <section className="animar-subida space-y-5">
      <div>
        <h1 className="text-3xl font-black">Painel Administrativo</h1>
        <p className="mt-1 text-zinc-400">Gerencie conteúdo, inscrições, usuários e configurações institucionais.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <CardKpi titulo="Total de episódios" valor={episodiosIniciais.length} />
        <CardKpi titulo="Total de workshops" valor={workshopsIniciais.length} />
        <CardKpi titulo="Total de inscritos" valor={totalInscritos} />
        <CardKpi titulo="Total de usuários" valor={totalUsuarios} />
      </div>

      <div className="painel-vidro rounded-2xl p-6">
        <h2 className="text-xl font-bold">Ações rápidas</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <button className="rounded-xl border border-zinc-700 px-4 py-3 text-left hover:border-orange-300/50">Cadastrar episódio</button>
          <button className="rounded-xl border border-zinc-700 px-4 py-3 text-left hover:border-orange-300/50">Cadastrar workshop</button>
          <button className="rounded-xl border border-zinc-700 px-4 py-3 text-left hover:border-orange-300/50">Editar textos do site</button>
        </div>
      </div>
    </section>
  );
}
