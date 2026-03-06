import { Navigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

export function AreaParticipantePage() {
  const { usuarioAuth, perfil, loading } = useAuth();

  if (loading) {
    return (
      <section className="section-card">
        <p className="text-sm text-zinc-300">Carregando sua sessão...</p>
      </section>
    );
  }

  if (!usuarioAuth) return <Navigate to="/login" replace />;

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Área do Participante</h1>
      <p className="text-zinc-200">Bem-vindo(a), {perfil?.nome ?? usuarioAuth.email}.</p>
      <div className="section-card grid gap-2 text-sm text-zinc-300 sm:grid-cols-2">
        <p>
          <strong className="text-zinc-100">E-mail:</strong> {perfil?.email ?? usuarioAuth.email}
        </p>
        <p>
          <strong className="text-zinc-100">Telefone:</strong> {perfil?.telefone || 'Não informado'}
        </p>
        <p>
          <strong className="text-zinc-100">Cidade:</strong> {perfil?.cidade || 'Não informada'}
        </p>
        <p>
          <strong className="text-zinc-100">Nascimento:</strong> {perfil?.data_nascimento || 'Não informado'}
        </p>
      </div>
    </section>
  );
}
