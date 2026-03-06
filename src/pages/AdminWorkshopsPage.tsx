import { useEffect, useState } from 'react';
import { FormularioWorkshop } from '@/components/FormularioWorkshop';
import { atualizarWorkshop, criarWorkshop, excluirWorkshop, listarWorkshops } from '@/services/api';
import type { Workshop } from '@/types/dominio';

const modelo: Omit<Workshop, 'id'> = {
  titulo: '',
  slug: '',
  descricao: '',
  data_evento: '',
  local: '',
  episodio_relacionado: '',
  video_gravacao: '',
  material_pdf: '',
  status: 'aberto',
};

export function AdminWorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [selecionado, setSelecionado] = useState<Workshop | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [feedback, setFeedback] = useState('');

  async function carregar() {
    const data = await listarWorkshops();
    setWorkshops(data);
  }

  useEffect(() => {
    void carregar();
  }, []);

  return (
    <section className="section-card space-y-4">
      <h2 className="text-xl font-semibold">Gestão de workshops</h2>
      <FormularioWorkshop
        salvando={salvando}
        initial={selecionado ? ({ ...selecionado, id: undefined } as never) : modelo}
        onSubmit={async (dados) => {
          setSalvando(true);
          setFeedback('');
          try {
            if (selecionado) await atualizarWorkshop(selecionado.id, dados);
            else await criarWorkshop(dados);
            setSelecionado(null);
            setFeedback('Workshop salvo com sucesso.');
            await carregar();
          } catch (error) {
            setFeedback(error instanceof Error ? error.message : 'Falha ao salvar workshop.');
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
              <th className="text-left">Data</th>
              <th className="text-left">Status</th>
              <th className="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {workshops.map((wk) => (
              <tr key={wk.id} className="border-t border-zinc-800">
                <td>{wk.titulo}</td>
                <td>{new Date(wk.data_evento).toLocaleDateString('pt-BR')}</td>
                <td>{wk.status}</td>
                <td className="space-x-2 text-right">
                  <button className="text-emerald-300" onClick={async () => {
                    const novoStatus = wk.status === 'aberto' ? 'encerrado' : 'aberto';
                    await atualizarWorkshop(wk.id, { status: novoStatus });
                    await carregar();
                  }}>
                    {wk.status === 'aberto' ? 'Encerrar' : 'Reabrir'}
                  </button>
                  <button className="text-orange-300" onClick={() => setSelecionado(wk)}>
                    Editar
                  </button>
                  <button className="text-red-300" onClick={async () => { await excluirWorkshop(wk.id); await carregar(); }}>
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
