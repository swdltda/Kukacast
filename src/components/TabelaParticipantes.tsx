import type { Usuario } from '@/types/dominio';

export function TabelaParticipantes({ usuarios }: { usuarios: Usuario[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[640px] bg-zinc-950/80 text-left text-sm">
        <thead>
          <tr className="bg-zinc-900/80 text-zinc-400">
            <th className="px-4 py-3">Nome</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Cidade</th>
            <th className="px-4 py-3">Tipo</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="border-t border-zinc-800 text-zinc-200">
              <td className="px-4 py-3">{usuario.nome}</td>
              <td className="px-4 py-3">{usuario.email}</td>
              <td className="px-4 py-3">{usuario.cidade}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-orange-500/15 px-2 py-1 text-xs text-orange-200">{usuario.tipo_usuario}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
