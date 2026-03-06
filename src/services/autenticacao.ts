import { supabaseConfig } from '@/integrations/supabase/cliente';
import { supabaseSelect } from '@/integrations/supabase/cliente';
import type { Usuario } from '@/types/dominio';

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
    localStorage.setItem('kuka-participante-email', email);

    const admin = await validarPerfilAdmin(email);
    localStorage.setItem('kuka-admin', String(admin));
    return sessao.user;
  }

  const admin = email === 'admin@kukacast.com' && senha === '123456';
  localStorage.setItem('kuka-admin', String(admin));
  localStorage.setItem('kuka-participante-email', email);
  return { id: admin ? 'admin-local' : 'participante-local', email };
}

export async function validarPerfilAdmin(email: string) {
  if (!supabaseConfig.habilitado) return email === 'admin@kukacast.com';
  const usuarios = await supabaseSelect<Usuario>('usuarios', { filters: [`email=eq.${email}`, 'tipo_usuario=eq.admin'] });
  return usuarios.length > 0;
}

export async function logout() {
  localStorage.removeItem('kuka-admin');
  localStorage.removeItem('kuka-token');
  localStorage.removeItem('kuka-participante-email');
}

export function usuarioEhAdmin() {
  return localStorage.getItem('kuka-admin') === 'true';
}
