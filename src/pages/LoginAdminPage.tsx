import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

export function LoginAdminPage() {
  const { entrar } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@kukacast.com');
  const [senha, setSenha] = useState('123456');

  return (
    <section className="max-w-md space-y-3">
      <h1 className="text-2xl font-bold">Login administrativo</h1>
      <input className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <button
        className="rounded bg-orange-500 px-4 py-2 font-semibold text-black"
        onClick={async () => {
          await entrar(email, senha);
          navigate('/admin');
        }}
      >Entrar</button>
    </section>
  );
}
