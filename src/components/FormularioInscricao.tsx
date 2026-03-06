import { useState } from 'react';
import { useNavigate } from 'react-router';
import { registrarInscricao } from '@/services/api';

const campos: Array<{ chave: keyof Formulario; label: string; tipo?: string }> = [
  { chave: 'nome', label: 'Nome completo' },
  { chave: 'email', label: 'E-mail', tipo: 'email' },
  { chave: 'telefone', label: 'Telefone' },
  { chave: 'data_nascimento', label: 'Data de nascimento', tipo: 'date' },
  { chave: 'cidade', label: 'Cidade' },
];

type Formulario = {
  nome: string;
  email: string;
  telefone: string;
  data_nascimento: string;
  cidade: string;
};

export function FormularioInscricao({ workshopId }: { workshopId: string }) {
  const [form, setForm] = useState<Formulario>({ nome: '', email: '', telefone: '', data_nascimento: '', cidade: '' });
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setCarregando(true);
    setMensagem('');
    try {
      const resposta = await registrarInscricao(form, workshopId);
      setMensagem(resposta.mensagem);
      if (resposta.sucesso) {
        setTimeout(() => navigate('/comunidade'), 1000);
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <form className="section-card mt-6 grid gap-4" onSubmit={onSubmit}>
      <div>
        <h2 className="text-xl font-bold">Inscrição no workshop</h2>
        <p className="mt-1 text-sm text-zinc-400">Preencha os dados para garantir sua vaga.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {campos.map(({ chave, label, tipo }) => (
          <label key={chave} className="space-y-1.5 text-sm text-zinc-200">
            <span>{label}</span>
            <input
              required
              type={tipo ?? 'text'}
              className="input-base"
              value={form[chave]}
              onChange={(e) => setForm((atual) => ({ ...atual, [chave]: e.target.value }))}
            />
          </label>
        ))}
      </div>

      {mensagem && <p className="text-sm text-orange-300">{mensagem}</p>}

      <button className="button-primary soft-pulse mt-2 px-4 py-3 text-sm" disabled={carregando}>
        {carregando ? 'Enviando...' : 'Confirmar inscrição'}
      </button>
    </form>
  );
}
