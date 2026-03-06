import { Outlet } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { SidebarAdmin } from '@/components/SidebarAdmin';
import { HeaderAdmin } from '@/components/HeaderAdmin';

export function LayoutAdmin() {
  const { perfil, loading } = useAuth();

  if (loading) {
    return (
      <div className="section-card mx-auto mt-10 w-full max-w-xl text-center">
        <p className="text-sm text-zinc-300">Carregando painel administrativo...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid min-h-screen w-full max-w-7xl gap-4 px-4 py-6 md:grid-cols-[280px_1fr]">
      <SidebarAdmin />
      <div className="space-y-4 rounded-3xl border border-orange-100/10 bg-[#130d0b]/75 p-4">
        <HeaderAdmin />
        <p className="px-2 text-xs uppercase tracking-[0.16em] text-orange-200/70">{perfil?.nome ?? 'Administrador'}</p>
        <Outlet />
      </div>
    </div>
  );
}
