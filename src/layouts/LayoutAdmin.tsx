import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { SidebarAdmin } from '@/components/SidebarAdmin';
import { HeaderAdmin } from '@/components/HeaderAdmin';

export function LayoutAdmin() {
  const { admin } = useAuth();
  if (!admin) return <Navigate to="/login-admin" replace />;

  return (
    <div className="mx-auto grid min-h-screen w-full max-w-7xl gap-4 px-4 py-6 md:grid-cols-[260px_1fr]">
      <SidebarAdmin />
      <div className="space-y-4">
        <HeaderAdmin />
        <Outlet />
      </div>
    </div>
  );
}
