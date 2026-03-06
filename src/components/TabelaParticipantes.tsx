import type { Usuario } from '@/types/dominio';

export function TabelaParticipantes({ usuarios }: { usuarios: Usuario[] }) {
  return (
    <div className="overflow-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-zinc-400">
            <th>Nome</th><th>Email</th><th>Telefone</th><th>Cidade</th><th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="border-t border-zinc-800">
              <td>{usuario.nome}</td><td>{usuario.email}</td><td>{usuario.telefone}</td><td>{usuario.cidade}</td><td>{usuario.tipo_usuario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
