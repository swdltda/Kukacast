export function SecaoComunidade({ texto }: { texto: string }) {
  return (
    <article className="section-card">
      <h2 className="text-xl font-bold">Comunidade ativa</h2>
      <p className="mt-2 text-zinc-300">{texto}</p>
    </article>
  );
}
