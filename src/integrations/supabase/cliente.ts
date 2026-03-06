const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfig = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
  habilitado: Boolean(supabaseUrl && supabaseAnonKey),
};

export async function supabaseSelect<T>(tabela: string, query = '*'): Promise<T[]> {
  if (!supabaseConfig.habilitado) return [];
  const resposta = await fetch(`${supabaseConfig.url}/rest/v1/${tabela}?select=${encodeURIComponent(query)}`, {
    headers: {
      apikey: supabaseConfig.anonKey,
      Authorization: `Bearer ${supabaseConfig.anonKey}`,
    },
  });
  if (!resposta.ok) throw new Error(`Erro ao consultar ${tabela}`);
  return (await resposta.json()) as T[];
}

export async function supabaseInsert<T>(tabela: string, payload: Record<string, unknown>): Promise<T[]> {
  if (!supabaseConfig.habilitado) return [];
  const resposta = await fetch(`${supabaseConfig.url}/rest/v1/${tabela}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      apikey: supabaseConfig.anonKey,
      Authorization: `Bearer ${supabaseConfig.anonKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!resposta.ok) throw new Error(`Erro ao inserir em ${tabela}`);
  return (await resposta.json()) as T[];
}
