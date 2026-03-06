const itens = [
  'Resumo do sistema',
  'Gestão de episódios',
  'Gestão de workshops',
  'Inscritos e usuários',
  'Configurações institucionais',
];

export function MenuAdmin() {
  return (
    <aside className="glass-card rounded-2xl p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-orange-200">Menu Admin</h3>
      <ul className="space-y-2.5 text-sm text-zinc-300">
        {itens.map((item) => (
          <li key={item} className="rounded-lg px-3 py-2 transition hover:bg-zinc-800/75 hover:text-zinc-100">
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
