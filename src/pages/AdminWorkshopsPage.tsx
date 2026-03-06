import { useEffect, useState } from 'react';
import { FormularioWorkshop } from '@/components/FormularioWorkshop';
import { atualizarWorkshop, criarWorkshop, excluirWorkshop, listarWorkshops } from '@/services/api';
import type { Workshop } from '@/types/dominio';

const modelo: Omit<Workshop, 'id'> = { titulo: '', slug: '', descricao: '', data_evento: '', local: '', episodio_relacionado: '', video_gravacao: '', material_pdf: '', status: 'aberto' };

export function AdminWorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [selecionado, setSelecionado] = useState<Workshop | null>(null);
  const [salvando, setSalvando] = useState(false);

  const carregar = () => void listarWorkshops().then(setWorkshops);
  useEffect(carregar, []);

  return <section className="section-card space-y-4">
    <h2 className="text-xl font-semibold">Gestão de workshops</h2>
    <FormularioWorkshop salvando={salvando} initial={selecionado ? ({ ...selecionado, id: undefined } as never) : modelo} onSubmit={async (dados) => {
      setSalvando(true);
      if (selecionado) await atualizarWorkshop(selecionado.id, dados);
      else await criarWorkshop(dados);
      setSelecionado(null);
      carregar();
      setSalvando(false);
    }} />
    <div className="overflow-auto">
      <table className="w-full text-sm"><thead><tr className="text-zinc-400"><th>Título</th><th>Data</th><th /></tr></thead><tbody>
        {workshops.map((wk) => <tr key={wk.id} className="border-t border-zinc-800"><td>{wk.titulo}</td><td>{new Date(wk.data_evento).toLocaleDateString('pt-BR')}</td><td className="space-x-2 text-right"><button className="text-orange-300" onClick={() => setSelecionado(wk)}>Editar</button><button className="text-red-300" onClick={async () => { await excluirWorkshop(wk.id); carregar(); }}>Excluir</button></td></tr>)}
      </tbody></table>
    </div>
  </section>;
}
