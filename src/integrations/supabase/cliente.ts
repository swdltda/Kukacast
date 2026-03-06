const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const baseHeaders = {
  apikey: supabaseAnonKey,
  Authorization: `Bearer ${supabaseAnonKey}`,
};

export const supabaseConfig = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
  habilitado: Boolean(supabaseUrl && supabaseAnonKey),
};

interface SelectOptions {
  query?: string;
  filters?: string[];
  orderBy?: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!supabaseConfig.habilitado) throw new Error('Supabase não configurado');

  const response = await fetch(`${supabaseConfig.url}/rest/v1/${path}`, {
    ...init,
    headers: {
      ...baseHeaders,
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const erro = await response.text();
    throw new Error(`Supabase request falhou (${response.status}): ${erro}`);
  }

  if (response.status === 204) return [] as T;
  return (await response.json()) as T;
}

export async function supabaseSelect<T>(tabela: string, options: SelectOptions = {}): Promise<T[]> {
  if (!supabaseConfig.habilitado) return [];

  const params = new URLSearchParams();
  params.set('select', options.query ?? '*');

  for (const filter of options.filters ?? []) {
    const [field, expression] = filter.split('=', 2);
    params.append(field, expression);
  }

  if (options.orderBy) params.set('order', options.orderBy);

  return request<T[]>(`${tabela}?${params.toString()}`);
}

export async function supabaseInsert<T>(tabela: string, payload: Record<string, unknown> | Record<string, unknown>[]): Promise<T[]> {
  if (!supabaseConfig.habilitado) return [];
  return request<T[]>(tabela, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(payload),
  });
}

export async function supabaseUpdate<T>(tabela: string, payload: Record<string, unknown>, filters: string[]): Promise<T[]> {
  if (!supabaseConfig.habilitado) return [];

  const params = new URLSearchParams();
  for (const filter of filters) {
    const [field, expression] = filter.split('=', 2);
    params.append(field, expression);
  }

  return request<T[]>(`${tabela}?${params.toString()}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(payload),
  });
}

export async function supabaseDelete(tabela: string, filters: string[]) {
  if (!supabaseConfig.habilitado) return;

  const params = new URLSearchParams();
  for (const filter of filters) {
    const [field, expression] = filter.split('=', 2);
    params.append(field, expression);
  }

  await request<unknown>(`${tabela}?${params.toString()}`, {
    method: 'DELETE',
    headers: { Prefer: 'return=minimal' },
  });
}
