import { useState } from 'react';
import { useNavigate } from 'react-router';
import { registrarInscricao } from '@/services/api';

export function FormularioInscricao({ workshopId }: { workshopId: string }) {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', data_nascimento: '', cidade: '' });
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setCarregando(true);
    setMensagem('');
    try {
      await registrarInscricao(form, workshopId);
      setMensagem('Inscrição confirmada com sucesso!');
      setTimeout(() => navigate('/comunidade'), 900);
    } catch {
      setMensagem('Não foi possível enviar agora. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <form className="painel-vidro mt-6 grid gap-3 rounded-2xl p-5" onSubmit={onSubmit}>
      <h3 className="text-lg font-bold">Inscreva-se no workshop</h3>
      {Object.entries(form).map(([chave, valor]) => (
        <label key={chave} className="text-sm text-zinc-300">
          <span className="mb-1 block capitalize">{chave.replace('_', ' ')}</span>
          <input
            required
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none transition focus:border-orange-300"
            placeholder={`Digite ${chave.replace('_', ' ')}`}
            value={valor}
            onChange={(e) => setForm((atual) => ({ ...atual, [chave]: e.target.value }))}
          />
        </label>
      ))}
      <button className="destaque-laranja rounded-xl px-4 py-3 font-bold transition hover:brightness-110 disabled:opacity-60" disabled={carregando}>
        {carregando ? 'Enviando...' : 'Confirmar inscrição'}
      </button>
      {mensagem && <p className="text-sm text-orange-200">{mensagem}</p>}
    </form>
  );
}
