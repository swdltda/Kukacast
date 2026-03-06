export function SecaoSobre({ texto }: { texto: string }) {
  return (
    <article className="section-card">
      <h2 className="text-xl font-bold">Sobre o projeto</h2>
      <p className="mt-2 text-zinc-300">{texto}</p>
    </article>
  );
}
