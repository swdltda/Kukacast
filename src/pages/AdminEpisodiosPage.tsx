import { useEffect, useState } from 'react';
import { FormularioEpisodio } from '@/components/FormularioEpisodio';
import { atualizarEpisodio, criarEpisodio, excluirEpisodio, listarEpisodios } from '@/services/api';
import type { Episodio } from '@/types/dominio';

const modelo: Omit<Episodio, 'id'> = { titulo: '', slug: '', descricao: '', mes: '', tema: '', youtube_url: '', spotify_url: '', thumbnail: '', data_publicacao: '', status: 'publicado' };

export function AdminEpisodiosPage() {
  const [episodios, setEpisodios] = useState<Episodio[]>([]);
  const [selecionado, setSelecionado] = useState<Episodio | null>(null);
  const [salvando, setSalvando] = useState(false);

  const carregar = () => void listarEpisodios().then(setEpisodios);
  useEffect(carregar, []);

  return <section className="section-card space-y-4">
    <h2 className="text-xl font-semibold">Gestão de episódios</h2>
    <FormularioEpisodio salvando={salvando} initial={selecionado ? { ...selecionado, id: undefined } as never : modelo} onSubmit={async (dados) => {
      setSalvando(true);
      if (selecionado) await atualizarEpisodio(selecionado.id, dados);
      else await criarEpisodio(dados);
      setSelecionado(null);
      carregar();
      setSalvando(false);
    }} />
    <div className="overflow-auto">
      <table className="w-full text-sm"><thead><tr className="text-zinc-400"><th>Título</th><th>Status</th><th /></tr></thead><tbody>
        {episodios.map((ep) => <tr key={ep.id} className="border-t border-zinc-800"><td>{ep.titulo}</td><td>{ep.status}</td><td className="space-x-2 text-right"><button className="text-orange-300" onClick={() => setSelecionado(ep)}>Editar</button><button className="text-red-300" onClick={async () => { await excluirEpisodio(ep.id); carregar(); }}>Excluir</button></td></tr>)}
      </tbody></table>
    </div>
  </section>;
}
