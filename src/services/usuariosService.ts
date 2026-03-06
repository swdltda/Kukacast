import { supabaseInsert, supabaseSelect, supabaseUpdate } from '@/integrations/supabase/cliente';
import type { Usuario } from '@/types/dominio';

export type PerfilPayload = Pick<Usuario, 'id' | 'nome' | 'email' | 'telefone' | 'data_nascimento' | 'cidade'> &
  Partial<Pick<Usuario, 'tipo_usuario' | 'ativo'>>;

export async function buscarPerfilPorId(id: string): Promise<Usuario | null> {
  const perfis = await supabaseSelect<Usuario>('usuarios', { filters: [`id=eq.${id}`] });
  return perfis[0] ?? null;
}

export async function buscarPerfilPorEmail(email: string): Promise<Usuario | null> {
  const perfis = await supabaseSelect<Usuario>('usuarios', { filters: [`email=eq.${email}`] });
  return perfis[0] ?? null;
}

export async function upsertPerfil(payload: PerfilPayload): Promise<Usuario> {
  const existente = await buscarPerfilPorId(payload.id);

  if (existente) {
    const atualizado = await supabaseUpdate<Usuario>(
      'usuarios',
      {
        nome: payload.nome,
        email: payload.email,
        telefone: payload.telefone,
        data_nascimento: payload.data_nascimento,
        cidade: payload.cidade,
      },
      [`id=eq.${payload.id}`],
    );

    return atualizado[0] ?? existente;
  }

  const criado = await supabaseInsert<Usuario>('usuarios', {
    id: payload.id,
    nome: payload.nome,
    email: payload.email,
    telefone: payload.telefone,
    data_nascimento: payload.data_nascimento,
    cidade: payload.cidade,
    tipo_usuario: payload.tipo_usuario ?? 'participante',
    ativo: payload.ativo ?? true,
  });

  return criado[0];
}
