import type { Workshop } from '@/types/dominio';

interface Props {
  initial: Omit<Workshop, 'id'>;
  onSubmit: (dados: Omit<Workshop, 'id'>) => Promise<void>;
  salvando: boolean;
}

export function FormularioWorkshop({ initial, onSubmit, salvando }: Props) {
  return (
    <form className="grid gap-3 md:grid-cols-2" onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      onSubmit(Object.fromEntries(formData.entries()) as Omit<Workshop, 'id'>);
    }}>
      {Object.entries(initial).map(([campo, valor]) => (
        <label key={campo} className="space-y-1 text-sm">
          <span className="capitalize text-zinc-300">{campo.replaceAll('_', ' ')}</span>
          <input className="input-base" name={campo} defaultValue={String(valor ?? '')} required={campo !== 'episodio_relacionado' && campo !== 'video_gravacao' && campo !== 'material_pdf'} />
        </label>
      ))}
      <button className="button-primary mt-2 px-4 py-3 text-sm md:col-span-2" disabled={salvando}>{salvando ? 'Salvando...' : 'Salvar workshop'}</button>
    </form>
  );
}
