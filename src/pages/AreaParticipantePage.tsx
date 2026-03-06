export function AreaParticipantePage() {
  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-3xl font-black">Área do Participante</h1>
        <p className="mt-1 text-zinc-400">Seu espaço para acompanhar inscrições, materiais e episódios em destaque.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="painel-vidro rounded-2xl p-5">
          <h2 className="font-bold">Workshops inscritos</h2>
          <p className="mt-2 text-sm text-zinc-300">Visualize os workshops em que você está inscrito.</p>
        </article>
        <article className="painel-vidro rounded-2xl p-5">
          <h2 className="font-bold">Materiais disponíveis</h2>
          <p className="mt-2 text-sm text-zinc-300">Acesse PDFs, gravações e conteúdos extras.</p>
        </article>
      </div>
    </section>
  );
}
