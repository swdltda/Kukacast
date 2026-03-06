export function Footer() {
  return (
    <footer className="mt-8 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Kuka Cast</p>
        <p>Comunicação, Tecnologia e Letramento Digital</p>
      </div>
    </footer>
  );
}
