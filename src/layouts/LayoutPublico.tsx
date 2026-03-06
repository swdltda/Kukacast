import { Outlet } from 'react-router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/hooks/useAuth';

export function LayoutPublico() {
  return (
    <AuthProvider>
      <div className="min-h-screen text-zinc-100">
        <Header />
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:gap-10 md:py-10">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
