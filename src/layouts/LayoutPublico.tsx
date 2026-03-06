import { Outlet } from 'react-router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/hooks/useAuth';

export function LayoutPublico() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-zinc-100">
        <Header />
        <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
