import { useEffect, useState } from 'react';
import { listarEpisodios, listarInscricoes, listarUsuarios, listarWorkshops } from '@/services/api';

export function AdminResumoPage() {
  const [totais, setTotais] = useState({ episodios: 0, workshops: 0, inscritos: 0, usuarios: 0 });

  useEffect(() => {
    void Promise.all([listarEpisodios(), listarWorkshops(), listarInscricoes(), listarUsuarios()]).then(([episodios, workshops, inscricoes, usuarios]) => {
      setTotais({ episodios: episodios.length, workshops: workshops.length, inscritos: inscricoes.length, usuarios: usuarios.length });
    });
  }, []);

  return (
    <section className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="metric-card">Total de episódios<strong>{totais.episodios}</strong></div>
        <div className="metric-card">Total de workshops<strong>{totais.workshops}</strong></div>
        <div className="metric-card">Total de inscritos<strong>{totais.inscritos}</strong></div>
        <div className="metric-card">Total de usuários<strong>{totais.usuarios}</strong></div>
      </div>
    </section>
  );
}
