import { useEffect, useMemo, useState } from 'react';
import {
  atualizarRegistroGenerico,
  criarRegistroGenerico,
  excluirRegistroGenerico,
  listarTabelaGenerica,
} from '@/services/api';

const tabelas = [
  { valor: 'convidados', label: 'Convidados' },
  { valor: 'materiais', label: 'Materiais' },
  { valor: 'banners_site', label: 'Banners do site' },
  { valor: 'kv_store', label: 'Catálogo (aulas/módulos/cursos/palestras)' },
];

const exemplo = '{\n  "titulo": "Nome do conteúdo",\n  "status": "publicado"\n}';

export function AdminConteudosPage() {
  const [tabelaAtiva, setTabelaAtiva] = useState(tabelas[0].valor);
  const [registros, setRegistros] = useState<Record<string, unknown>[]>([]);
  const [jsonForm, setJsonForm] = useState(exemplo);
  const [registroEditando, setRegistroEditando] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const titulo = useMemo(() => tabelas.find((item) => item.valor === tabelaAtiva)?.label ?? tabelaAtiva, [tabelaAtiva]);

  async function carregar() {
    setLoading(true);
    setFeedback('');
    try {
      const data = await listarTabelaGenerica(tabelaAtiva);
      setRegistros(data);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Falha ao carregar conteúdo.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void carregar();
  }, [tabelaAtiva]);

  async function salvarRegistro(event: React.FormEvent) {
    event.preventDefault();
    setFeedback('');

    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(jsonForm) as Record<string, unknown>;
    } catch {
      setFeedback('JSON inválido. Revise o conteúdo antes de salvar.');
      return;
    }

    setLoading(true);
    try {
      if (registroEditando?.id && typeof registroEditando.id === 'string') {
        await atualizarRegistroGenerico(tabelaAtiva, registroEditando.id, payload);
        setFeedback('Registro atualizado com sucesso.');
      } else {
        await criarRegistroGenerico(tabelaAtiva, payload);
        setFeedback('Registro criado com sucesso.');
      }

      setRegistroEditando(null);
      setJsonForm(exemplo);
      await carregar();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Não foi possível salvar o registro.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section-card space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Conteúdos editoriais</h2>
          <p className="text-sm text-zinc-400">Gerencie convidados, materiais, banners e catálogo institucional.</p>
        </div>
        <select className="input-base max-w-xs" value={tabelaAtiva} onChange={(e) => setTabelaAtiva(e.target.value)}>
          {tabelas.map((tabela) => (
            <option key={tabela.valor} value={tabela.valor}>
              {tabela.label}
            </option>
          ))}
        </select>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-3 rounded-2xl border border-orange-200/15 bg-black/20 p-3">
          <h3 className="font-medium">Lista: {titulo}</h3>
          {loading ? <p className="text-sm text-zinc-400">Carregando...</p> : null}
          <div className="max-h-[420px] space-y-2 overflow-auto">
            {registros.map((registro) => (
              <article key={String(registro.id ?? JSON.stringify(registro))} className="rounded-xl border border-zinc-700/70 p-3 text-xs">
                <pre className="overflow-auto whitespace-pre-wrap text-zinc-300">{JSON.stringify(registro, null, 2)}</pre>
                <div className="mt-2 flex gap-2">
                  <button
                    className="button-secondary px-3 py-1 text-xs"
                    onClick={() => {
                      setRegistroEditando(registro);
                      setJsonForm(JSON.stringify(registro, null, 2));
                    }}
                  >
                    Editar
                  </button>
                  {typeof registro.id === 'string' ? (
                    <button
                      className="rounded-full border border-red-400/40 px-3 py-1 text-xs text-red-200"
                      onClick={async () => {
                        try {
                          await excluirRegistroGenerico(tabelaAtiva, registro.id as string);
                          setFeedback('Registro removido com sucesso.');
                          await carregar();
                        } catch (error) {
                          setFeedback(error instanceof Error ? error.message : 'Não foi possível excluir o registro.');
                        }
                      }}
                    >
                      Excluir
                    </button>
                  ) : null}
                </div>
              </article>
            ))}
            {!registros.length && !loading ? <p className="text-sm text-zinc-400">Nenhum registro cadastrado.</p> : null}
          </div>
        </div>

        <form onSubmit={salvarRegistro} className="space-y-3 rounded-2xl border border-orange-200/15 bg-black/20 p-3">
          <h3 className="font-medium">{registroEditando ? 'Editar registro' : 'Novo registro'}</h3>
          <textarea
            className="input-base min-h-[320px] font-mono text-xs"
            value={jsonForm}
            onChange={(e) => setJsonForm(e.target.value)}
            spellCheck={false}
          />
          <button type="submit" className="button-primary w-full px-4 py-2" disabled={loading}>
            {loading ? 'Salvando...' : registroEditando ? 'Atualizar' : 'Criar registro'}
          </button>
          {feedback ? <p className="text-xs text-orange-200">{feedback}</p> : null}
        </form>
      </div>
    </section>
  );
}
