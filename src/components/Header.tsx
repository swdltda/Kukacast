import { Link, NavLink } from 'react-router';

const links = [
  { rota: '/sobre', label: 'Sobre' },
  { rota: '/felipe-costa', label: 'Felipe Costa' },
  { rota: '/episodios', label: 'Episódios' },
  { rota: '/workshops', label: 'Workshops' },
  { rota: '/comunidade', label: 'Comunidade' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="group flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-orange-400 shadow-[0_0_12px] shadow-orange-500" />
          <span className="text-xl font-extrabold tracking-tight text-orange-300 transition group-hover:text-orange-200">Kuka Cast</span>
        </Link>

        <nav className="hidden items-center gap-2 text-sm text-zinc-200 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.rota}
              to={link.rota}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 transition ${isActive ? 'bg-orange-500/20 text-orange-200' : 'hover:bg-white/10 hover:text-white'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/admin" className="ml-1 rounded-full border border-orange-400/40 px-3 py-2 text-orange-200 hover:bg-orange-500/10">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
