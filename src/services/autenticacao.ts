import { supabaseConfig } from '@/integrations/supabase/cliente';

export async function login(email: string, senha: string) {
  if (supabaseConfig.habilitado) {
    const resposta = await fetch(`${supabaseConfig.url}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseConfig.anonKey,
      },
      body: JSON.stringify({ email, password: senha }),
    });

    if (!resposta.ok) throw new Error('Falha no login');
    const sessao = await resposta.json();
    localStorage.setItem('kuka-token', sessao.access_token);
    localStorage.setItem('kuka-admin', String(email === 'admin@kukacast.com'));
    localStorage.setItem('kuka-participante-email', email);
    return sessao.user;
  }

  if (email === 'admin@kukacast.com' && senha === '123456') {
    localStorage.setItem('kuka-admin', 'true');
    localStorage.setItem('kuka-participante-email', email);
    return { id: 'admin-local', email };
  }

  localStorage.setItem('kuka-admin', 'false');
  localStorage.setItem('kuka-participante-email', email);
  return { id: 'participante-local', email };
}

export async function logout() {
  localStorage.removeItem('kuka-admin');
  localStorage.removeItem('kuka-token');
}

export function usuarioEhAdmin() {
  return localStorage.getItem('kuka-admin') === 'true';
}
