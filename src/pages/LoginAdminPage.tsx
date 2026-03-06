import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

export function LoginAdminPage() {
  const { entrar } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@kukacast.com');
  const [senha, setSenha] = useState('123456');

  return (
    <section className="mx-auto w-full max-w-md">
      <div className="painel-vidro animar-subida rounded-3xl p-6 md:p-8">
        <h1 className="text-2xl font-black">Login administrativo</h1>
        <p className="mt-1 text-sm text-zinc-400">Acesse para gerenciar episódios, workshops e inscrições.</p>

        <div className="mt-5 space-y-3">
          <input className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-3 focus:border-orange-300 focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
          <input type="password" className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-3 focus:border-orange-300 focus:outline-none" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" />
        </div>

        <button
          className="destaque-laranja mt-5 w-full rounded-xl px-4 py-3 font-bold transition hover:brightness-110"
          onClick={async () => {
            await entrar(email, senha);
            navigate('/admin');
          }}
        >
          Entrar
        </button>
      </div>
    </section>
  );
}
