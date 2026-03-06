import { useEffect, useState } from 'react';
import { FormularioEpisodio } from '@/components/FormularioEpisodio';
import { atualizarEpisodio, criarEpisodio, excluirEpisodio, listarEpisodios } from '@/services/api';
import type { Episodio } from '@/types/dominio';

const modelo: Omit<Episodio, 'id'> = {
  titulo: '',
  slug: '',
  descricao: '',
  mes: '',
  tema: '',
  youtube_url: '',
  spotify_url: '',
  thumbnail: '',
  data_publicacao: '',
  status: 'publicado',
};

export function AdminEpisodiosPage() {
  const [episodios, setEpisodios] = useState<Episodio[]>([]);
  const [selecionado, setSelecionado] = useState<Episodio | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [feedback, setFeedback] = useState('');

  async function carregar() {
    const data = await listarEpisodios();
    setEpisodios(data);
  }

  useEffect(() => {
    void carregar();
  }, []);

  return (
    <section className="section-card space-y-4">
      <h2 className="text-xl font-semibold">Gestão de episódios</h2>
      <FormularioEpisodio
        salvando={salvando}
        initial={selecionado ? ({ ...selecionado, id: undefined } as never) : modelo}
        onSubmit={async (dados) => {
          setSalvando(true);
          setFeedback('');
          try {
            if (selecionado) await atualizarEpisodio(selecionado.id, dados);
            else await criarEpisodio(dados);
            setSelecionado(null);
            setFeedback('Episódio salvo com sucesso.');
            await carregar();
          } catch (error) {
            setFeedback(error instanceof Error ? error.message : 'Falha ao salvar episódio.');
          } finally {
            setSalvando(false);
          }
        }}
      />
      {feedback ? <p className="text-sm text-orange-200">{feedback}</p> : null}
      <div className="overflow-auto rounded-2xl border border-orange-100/10 bg-black/20 p-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-zinc-400">
              <th className="text-left">Título</th>
              <th className="text-left">Status</th>
              <th className="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {episodios.map((ep) => (
              <tr key={ep.id} className="border-t border-zinc-800">
                <td>{ep.titulo}</td>
                <td>{ep.status}</td>
                <td className="space-x-2 py-2 text-right">
                  <button className="text-emerald-300" onClick={async () => {
                    const novoStatus = ep.status === 'publicado' ? 'rascunho' : 'publicado';
                    await atualizarEpisodio(ep.id, { status: novoStatus });
                    await carregar();
                  }}>
                    {ep.status === 'publicado' ? 'Despublicar' : 'Publicar'}
                  </button>
                  <button className="text-orange-300" onClick={() => setSelecionado(ep)}>
                    Editar
                  </button>
                  <button className="text-red-300" onClick={async () => { await excluirEpisodio(ep.id); await carregar(); }}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
