import { supabaseSelect } from '@/integrations/supabase/cliente';

export const ADMIN_ALPHA_EMAIL = 'email@kukacast.com';
export const ADMIN_ALPHA_ID = 'f98475c7-91b3-4c6f-b749-34be638c2e0f';

type RegistroAdmin = Record<string, unknown>;

function normalizar(valor: unknown) {
  return typeof valor === 'string' ? valor.trim().toLowerCase() : '';
}

function adminPorRegistro(registro: RegistroAdmin, userId: string, email: string) {
  const emailNormalizado = normalizar(email);
  const possiveisEmails = [registro.email, registro.admin_email, registro.usuario_email].map(normalizar);
  const possiveisIds = [registro.user_id, registro.usuario_id, registro.auth_user_id, registro.id_usuario, registro.id].map((id) =>
    typeof id === 'string' ? id : '',
  );
  const ativo = registro.ativo;

  const estaAtivo = typeof ativo === 'boolean' ? ativo : true;

  return estaAtivo && (possiveisIds.includes(userId) || possiveisEmails.includes(emailNormalizado));
}

export async function verificarAcessoAdmin(userId?: string, email?: string) {
  if (!userId || !email) return false;

  const emailNormalizado = email.trim().toLowerCase();
  if (userId === ADMIN_ALPHA_ID && emailNormalizado === ADMIN_ALPHA_EMAIL) return true;

  const tabelas = ['administradores', 'usuarios'];

  for (const tabela of tabelas) {
    try {
      const registros = await supabaseSelect<RegistroAdmin>(tabela);
      const encontrou = registros.some((registro) => adminPorRegistro(registro, userId, emailNormalizado));
      if (encontrou) return true;

      if (
        tabela === 'usuarios' &&
        registros.some((registro) => {
          const id = typeof registro.id === 'string' ? registro.id : '';
          const em = normalizar(registro.email);
          const tipo = normalizar(registro.tipo_usuario);
          return id === userId && em === emailNormalizado && tipo === 'admin';
        })
      ) {
        return true;
      }
    } catch {
      // continua tentando em outras tabelas
    }
  }

  return false;
}
