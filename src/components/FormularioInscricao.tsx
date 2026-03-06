import { useState } from 'react';
import { useNavigate } from 'react-router';
import { registrarInscricao } from '@/services/api';

export function FormularioInscricao({ workshopId }: { workshopId: string }) {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', data_nascimento: '', cidade: '' });
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setCarregando(true);
    try {
      await registrarInscricao(form, workshopId);
      navigate('/comunidade');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <form className="mt-6 grid gap-3" onSubmit={onSubmit}>
      {Object.entries(form).map(([chave, valor]) => (
        <input
          key={chave}
          required
          className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2"
          placeholder={chave.replace('_', ' ')}
          value={valor}
          onChange={(e) => setForm((atual) => ({ ...atual, [chave]: e.target.value }))}
        />
      ))}
      <button className="rounded bg-orange-500 px-4 py-2 font-semibold text-black" disabled={carregando}>
        {carregando ? 'Enviando...' : 'Confirmar inscrição'}
      </button>
    </form>
  );
}
