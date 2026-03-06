const itens = ['Resumo do sistema', 'Episódios', 'Workshops', 'Inscritos', 'Usuários', 'Configurações'];

export function MenuAdmin() {
  return (
    <aside className="painel-vidro h-fit rounded-2xl p-4">
      <h3 className="mb-4 text-lg font-bold text-orange-200">Painel Administrativo</h3>
      <ul className="space-y-1 text-sm">
        {itens.map((item) => (
          <li key={item} className="rounded-lg px-3 py-2 text-zinc-300 transition hover:bg-white/5 hover:text-white">
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
