import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

export function AdminRoute() {
  const { loading, usuarioAuth, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="section-card mx-auto mt-10 w-full max-w-xl text-center">
        <p className="text-sm text-zinc-300">Validando sessão...</p>
      </div>
    );
  }

  if (!usuarioAuth) return <Navigate to="/login-admin" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
}
