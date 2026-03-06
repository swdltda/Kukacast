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
    <aside className="rounded-3xl border border-orange-200/10 bg-[#120d0b]/95 p-5 shadow-2xl shadow-black/50">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-orange-200">Painel Kuka Cast</h3>
      <ul className="space-y-2 text-sm">
        {itens.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) =>
                `block rounded-xl px-3 py-2 transition hover:bg-orange-500/15 hover:text-orange-100 ${isActive ? 'bg-orange-500/20 text-orange-200' : 'text-orange-100/75'}`
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
