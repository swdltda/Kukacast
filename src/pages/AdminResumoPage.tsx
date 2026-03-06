import { useEffect, useState } from 'react';
import { DashboardAdmin } from '@/components/DashboardAdmin';
import { listarEpisodios, listarInscricoes, listarUsuarios, listarWorkshops } from '@/services/api';

export function AdminResumoPage() {
  const [totais, setTotais] = useState({ episodios: 0, workshops: 0, inscritos: 0, usuarios: 0 });

  useEffect(() => {
    void Promise.all([listarEpisodios(), listarWorkshops(), listarInscricoes(), listarUsuarios()]).then(([episodios, workshops, inscricoes, usuarios]) => {
      setTotais({ episodios: episodios.length, workshops: workshops.length, inscritos: inscricoes.length, usuarios: usuarios.length });
    });
  }, []);

  return <DashboardAdmin {...totais} />;
}
