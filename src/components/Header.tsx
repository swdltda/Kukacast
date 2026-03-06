import { Link } from 'react-router';

const links = [
  { label: 'Sobre', to: '/sobre' },
  { label: 'Episódios', to: '/episodios' },
  { label: 'Workshops', to: '/workshops' },
  { label: 'Comunidade', to: '/comunidade' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-4 py-4 sm:px-6">
        <Link to="/" className="text-lg font-bold tracking-wide text-orange-300 sm:text-xl">
          Kuka Cast
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-2 text-xs text-zinc-200 sm:gap-3 sm:text-sm">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-lg px-3 py-1.5 transition hover:bg-zinc-800/75 hover:text-orange-200"
            >
              {link.label}
            </Link>
          ))}
          <Link to="/admin" className="button-secondary px-3 py-1.5 text-orange-100">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
