import { Outlet } from 'react-router';
import { HeaderPublico } from '@/components/HeaderPublico';
import { Footer } from '@/components/Footer';

export function LayoutPublico() {
  return (
    <div className="min-h-screen bg-transparent text-zinc-100">
      <HeaderPublico />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-10 pt-28 sm:px-6 sm:pt-30">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
