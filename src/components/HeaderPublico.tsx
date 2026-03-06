import { Link, NavLink } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

const links = [
  { label: 'Sobre', to: '/sobre' },
  { label: 'Episódios', to: '/episodios' },
  { label: 'Workshops', to: '/workshops' },
  { label: 'Comunidade', to: '/comunidade' },
];

export function HeaderPublico() {
  const { usuarioAuth } = useAuth();

  return (
    <header className="fixed top-0 z-40 w-full border-b border-orange-100/10 bg-[#120d0b]/65 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-4 py-4 sm:px-6">
        <Link to="/" className="text-lg font-black tracking-wide text-orange-100 sm:text-xl">
          KUKA <span className="text-orange-400">CAST</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-2 text-xs text-orange-50/90 sm:gap-3 sm:text-sm">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 font-medium transition hover:bg-orange-500/20 hover:text-orange-100 ${isActive ? 'bg-orange-500/30 text-orange-100' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {usuarioAuth ? (
            <NavLink
              to="/area-do-participante"
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 font-medium transition hover:bg-orange-500/20 hover:text-orange-100 ${isActive ? 'bg-orange-500/30 text-orange-100' : ''}`
              }
            >
              Minha área
            </NavLink>
          ) : (
            <>
              <NavLink to="/login" className="rounded-full px-3 py-1.5 font-medium transition hover:bg-orange-500/20 hover:text-orange-100">
                Entrar
              </NavLink>
              <NavLink to="/cadastro" className="rounded-full bg-orange-500/30 px-3 py-1.5 font-medium text-orange-100 transition hover:bg-orange-500/40">
                Cadastrar
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
