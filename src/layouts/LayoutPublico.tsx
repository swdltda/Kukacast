import { Outlet } from 'react-router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/hooks/useAuth';

export function LayoutPublico() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-transparent text-zinc-100">
        <Header />
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
