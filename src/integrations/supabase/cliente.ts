const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const AUTH_STORAGE_KEY = 'kuka-auth-session';

function canUseBrowserStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export const supabaseConfig = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
  habilitado: Boolean(supabaseUrl && supabaseAnonKey),
};

export interface AuthUser {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  token_type?: string;
  user: AuthUser;
}

type AuthChangeEvent = 'SIGNED_IN' | 'SIGNED_OUT' | 'TOKEN_REFRESHED' | 'INITIAL_SESSION';
type AuthListener = (event: AuthChangeEvent, session: AuthSession | null) => void;

const listeners = new Set<AuthListener>();

function readStoredSession(): AuthSession | null {
  if (!canUseBrowserStorage()) return null;

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

function emitAuthChange(event: AuthChangeEvent, session: AuthSession | null) {
  listeners.forEach((listener) => listener(event, session));
}

function saveSession(session: AuthSession | null, event: AuthChangeEvent) {
  if (canUseBrowserStorage()) {
    if (session) window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    else window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  emitAuthChange(event, session);
}

async function requestAuth<T>(path: string, init?: RequestInit): Promise<T> {
  if (!supabaseConfig.habilitado) throw new Error('Supabase não configurado');

  const response = await fetch(`${supabaseConfig.url}/auth/v1/${path}`, {
    ...init,
    headers: {
      apikey: supabaseConfig.anonKey,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const erro = await response.text();
    throw new Error(`Auth request falhou (${response.status}): ${erro}`);
  }

  if (response.status === 204) return {} as T;
  return (await response.json()) as T;
}

async function refreshSession(session: AuthSession): Promise<AuthSession | null> {
  try {
    const data = await requestAuth<AuthSession>('token?grant_type=refresh_token', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: session.refresh_token }),
    });

    const refreshed: AuthSession = {
      ...data,
      expires_at: Math.floor(Date.now() / 1000) + data.expires_in,
    };

    saveSession(refreshed, 'TOKEN_REFRESHED');
    return refreshed;
  } catch {
    saveSession(null, 'SIGNED_OUT');
    return null;
  }
}

function isSessionExpired(session: AuthSession) {
  if (!session.expires_at) return false;
  const now = Math.floor(Date.now() / 1000);
  return session.expires_at <= now + 30;
}

function getSessionInternal() {
  return readStoredSession();
}

async function getValidSession() {
  const session = getSessionInternal();
  if (!session) return null;
  if (!isSessionExpired(session)) return session;
  return refreshSession(session);
}

function getBearerToken(session: AuthSession | null) {
  return session?.access_token ?? supabaseConfig.anonKey;
}

interface SelectOptions {
  query?: string;
  filters?: string[];
  orderBy?: string;
}

async function requestRest<T>(path: string, init?: RequestInit): Promise<T> {
  if (!supabaseConfig.habilitado) throw new Error('Supabase não configurado');

  const session = await getValidSession();

  const response = await fetch(`${supabaseConfig.url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: supabaseConfig.anonKey,
      Authorization: `Bearer ${getBearerToken(session)}`,
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

export const supabase = {
  auth: {
    onAuthStateChange(callback: AuthListener) {
      listeners.add(callback);
      callback('INITIAL_SESSION', getSessionInternal());
      return {
        data: {
          subscription: {
            unsubscribe: () => listeners.delete(callback),
          },
        },
      };
    },
    async getSession() {
      const session = await getValidSession();
      return { data: { session } };
    },
    async signUp({ email, password, options }: { email: string; password: string; options?: { data?: Record<string, unknown> } }) {
      const data = await requestAuth<{ user: AuthUser | null; session: AuthSession | null }>('signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, data: options?.data ?? {} }),
      });

      if (data.session) {
        const session: AuthSession = {
          ...data.session,
          expires_at: Math.floor(Date.now() / 1000) + data.session.expires_in,
        };
        saveSession(session, 'SIGNED_IN');
      }

      return { data, error: null };
    },
    async signInWithPassword({ email, password }: { email: string; password: string }) {
      const session = await requestAuth<AuthSession>('token?grant_type=password', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const parsedSession: AuthSession = {
        ...session,
        expires_at: Math.floor(Date.now() / 1000) + session.expires_in,
      };

      saveSession(parsedSession, 'SIGNED_IN');
      return { data: { user: session.user, session: parsedSession }, error: null };
    },
    async signOut() {
      const session = await getValidSession();
      if (session?.access_token) {
        try {
          await requestAuth('logout', {
            method: 'POST',
            headers: { Authorization: `Bearer ${session.access_token}` },
          });
        } catch {
          // Ignora erro de logout no backend para garantir limpeza local
        }
      }

      saveSession(null, 'SIGNED_OUT');
      return { error: null };
    },
  },
};

export async function supabaseSelect<T>(tabela: string, options: SelectOptions = {}): Promise<T[]> {
  if (!supabaseConfig.habilitado) return [];

  const params = new URLSearchParams();
  params.set('select', options.query ?? '*');

  for (const filter of options.filters ?? []) {
    const [field, expression] = filter.split('=', 2);
    params.append(field, expression);
  }

  if (options.orderBy) params.set('order', options.orderBy);

  return requestRest<T[]>(`${tabela}?${params.toString()}`);
}

export async function supabaseInsert<T>(tabela: string, payload: Record<string, unknown> | Record<string, unknown>[]): Promise<T[]> {
  if (!supabaseConfig.habilitado) return [];
  return requestRest<T[]>(tabela, {
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

  return requestRest<T[]>(`${tabela}?${params.toString()}`, {
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

  await requestRest<unknown>(`${tabela}?${params.toString()}`, {
    method: 'DELETE',
    headers: { Prefer: 'return=minimal' },
  });
}
