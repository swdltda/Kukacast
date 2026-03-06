import { useEffect, useState } from 'react';
import { TabelaParticipantes } from '@/components/TabelaParticipantes';
import { listarUsuarios } from '@/services/api';
import type { Usuario } from '@/types/dominio';

export function AdminParticipantesPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  useEffect(() => void listarUsuarios().then(setUsuarios), []);

  return (
    <section className="section-card space-y-4">
      <h2 className="text-xl font-semibold">Participantes e usuários</h2>
      {usuarios.length ? <TabelaParticipantes usuarios={usuarios} /> : <p className="text-zinc-400">Nenhum usuário cadastrado.</p>}
    </section>
  );
}
