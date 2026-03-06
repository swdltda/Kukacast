import type { Convidado } from '@/types/dominio';

export function BlocoConvidados({ convidados }: { convidados: Convidado[] }) {
  return (
    <section className="section-card">
      <h3 className="text-xl font-semibold text-orange-50">Convidados</h3>
      {convidados.length ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {convidados.map((convidado) => (
            <article key={convidado.id} className="rounded-2xl border border-orange-200/20 bg-black/25 p-4">
              <div className="flex items-center gap-3">
                <img src={convidado.foto} alt={convidado.nome} className="h-14 w-14 rounded-full border border-orange-200/30 object-cover" />
                <div>
                  <h4 className="font-semibold text-orange-50">{convidado.nome}</h4>
                  <p className="text-xs text-orange-100/70">{convidado.cargo} · {convidado.instituicao}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-orange-100/80">{convidado.bio}</p>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-sm text-orange-100/65">Sem convidados cadastrados neste episódio.</p>
      )}
    </section>
  );
}
