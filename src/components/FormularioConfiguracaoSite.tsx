import { useState } from 'react';
import type { ConfiguracoesHome } from '@/types/dominio';

export function FormularioConfiguracaoSite({ configuracoes, onSave }: { configuracoes: ConfiguracoesHome; onSave: (dados: ConfiguracoesHome) => Promise<void> }) {
  const [state, setState] = useState(configuracoes);
  const [salvando, setSalvando] = useState(false);

  return (
    <form className="grid gap-3 md:grid-cols-2" onSubmit={async (e) => {
      e.preventDefault();
      setSalvando(true);
      await onSave(state);
      setSalvando(false);
    }}>
      {Object.entries(state).map(([chave, valor]) => (
        <label key={chave} className="space-y-1 text-sm">
          <span className="capitalize text-zinc-300">{chave.replaceAll('_', ' ')}</span>
          <input className="input-base" value={valor} onChange={(e) => setState((s) => ({ ...s, [chave]: e.target.value }))} />
        </label>
      ))}
      <button className="button-primary mt-2 px-4 py-3 text-sm md:col-span-2" disabled={salvando}>{salvando ? 'Salvando...' : 'Salvar configurações'}</button>
    </form>
  );
}
