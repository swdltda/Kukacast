export function PlayerVideo({ url }: { url: string }) {
  return <iframe className="aspect-video w-full rounded-xl" src={url} title="Player do YouTube" allowFullScreen />;
}
