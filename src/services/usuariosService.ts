import { supabaseInsert, supabaseSelect, supabaseUpdate } from '@/integrations/supabase/cliente';
import type { Usuario } from '@/types/dominio';

export type PerfilPayload = Pick<Usuario, 'id' | 'nome' | 'email' | 'telefone' | 'data_nascimento' | 'cidade'> &
  Partial<Pick<Usuario, 'tipo_usuario' | 'ativo'>>;

const DATA_NASCIMENTO_PADRAO = '1900-01-01';

function sanitizarPerfil(payload: PerfilPayload) {
  return {
    id: payload.id,
    nome: payload.nome.trim(),
    email: payload.email.trim().toLowerCase(),
    telefone: payload.telefone.trim() || 'Não informado',
    data_nascimento: payload.data_nascimento || DATA_NASCIMENTO_PADRAO,
    cidade: payload.cidade.trim() || 'Não informado',
    tipo_usuario: payload.tipo_usuario ?? 'participante',
  };
}

export async function buscarPerfilPorId(id: string): Promise<Usuario | null> {
  const perfis = await supabaseSelect<Usuario>('usuarios', { filters: [`id=eq.${id}`] });
  return perfis[0] ?? null;
}

export async function upsertPerfil(payload: PerfilPayload): Promise<Usuario> {
  const perfilSanitizado = sanitizarPerfil(payload);
  const existente = await buscarPerfilPorId(payload.id);

  if (existente) {
    const atualizado = await supabaseUpdate<Usuario>(
      'usuarios',
      {
        nome: perfilSanitizado.nome,
        email: perfilSanitizado.email,
        telefone: perfilSanitizado.telefone,
        data_nascimento: perfilSanitizado.data_nascimento,
        cidade: perfilSanitizado.cidade,
        tipo_usuario: perfilSanitizado.tipo_usuario,
      },
      [`id=eq.${payload.id}`],
    );

    return atualizado[0] ?? { ...existente, ...perfilSanitizado };
  }

  const criado = await supabaseInsert<Usuario>('usuarios', perfilSanitizado);

  return criado[0] ?? (perfilSanitizado as Usuario);
}
