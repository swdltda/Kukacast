export function PlayerSpotifyCard({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="section-card block border-green-300/20 bg-gradient-to-br from-[#123328] to-[#08130f]"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-green-200/70">Spotify</p>
      <h3 className="mt-2 text-lg font-bold text-green-50">Ouvir no Spotify</h3>
      <p className="mt-2 text-sm text-green-100/80">Abra o episódio no app e acompanhe a conversa completa com qualidade premium.</p>
    </a>
  );
}
