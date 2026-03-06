import { Link } from 'react-router';

const links = ['sobre', 'felipe-costa', 'episodios', 'workshops', 'comunidade'];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-orange-900/30 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-orange-400">Kuka Cast</Link>
        <nav className="flex gap-4 text-sm text-zinc-200">
          {links.map((link) => (
            <Link key={link} to={`/${link}`}>{link}</Link>
          ))}
          <Link to="/admin" className="text-orange-300">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
