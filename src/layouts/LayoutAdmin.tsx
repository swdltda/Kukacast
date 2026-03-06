import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { MenuAdmin } from '@/components/MenuAdmin';

export function LayoutAdmin() {
  const { admin } = useAuth();
  if (!admin) return <Navigate to="/login-admin" replace />;

  return (
    <div className="grid gap-4 md:grid-cols-[260px_1fr]">
      <MenuAdmin />
      <Outlet />
    </div>
  );
}
