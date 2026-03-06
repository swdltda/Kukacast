import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { MenuAdmin } from '@/components/MenuAdmin';

export function LayoutAdmin() {
  const { admin } = useAuth();
  if (!admin) return <Navigate to="/login-admin" replace />;

  return (
    <div className="animar-subida grid gap-4 lg:grid-cols-[260px_1fr]">
      <MenuAdmin />
      <div className="min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
