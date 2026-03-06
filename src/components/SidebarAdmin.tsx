import { NavLink } from 'react-router';

const itens = [
  { to: '/admin', label: 'Resumo' },
  { to: '/admin/episodios', label: 'Episódios' },
  { to: '/admin/workshops', label: 'Workshops' },
  { to: '/admin/participantes', label: 'Participantes' },
  { to: '/admin/configuracoes', label: 'Configurações do site' },
];

export function SidebarAdmin() {
  return (
    <aside className="glass-card rounded-2xl p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-orange-200">Painel Kuka Cast</h3>
      <ul className="space-y-2 text-sm">
        {itens.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 transition hover:bg-zinc-800/75 hover:text-zinc-100 ${isActive ? 'bg-zinc-800 text-orange-300' : 'text-zinc-300'}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
