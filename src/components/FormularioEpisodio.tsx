import type { Episodio } from '@/types/dominio';

interface Props {
  initial: Omit<Episodio, 'id'>;
  onSubmit: (dados: Omit<Episodio, 'id'>) => Promise<void>;
  salvando: boolean;
}

export function FormularioEpisodio({ initial, onSubmit, salvando }: Props) {
  return (
    <form className="grid gap-3 md:grid-cols-2" onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      onSubmit(Object.fromEntries(formData.entries()) as Omit<Episodio, 'id'>);
    }}>
      {Object.entries(initial).map(([campo, valor]) => (
        <label key={campo} className="space-y-1 text-sm">
          <span className="capitalize text-zinc-300">{campo.replaceAll('_', ' ')}</span>
          <input className="input-base" name={campo} defaultValue={String(valor ?? '')} required={campo !== 'video_gravacao' && campo !== 'material_pdf'} />
        </label>
      ))}
      <button className="button-primary mt-2 px-4 py-3 text-sm md:col-span-2" disabled={salvando}>{salvando ? 'Salvando...' : 'Salvar episódio'}</button>
    </form>
  );
}
