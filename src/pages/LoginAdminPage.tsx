import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

export function LoginAdminPage() {
  const { entrar } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@kukacast.com');
  const [senha, setSenha] = useState('123456');
  const [erro, setErro] = useState('');

  return (
    <section className="mx-auto w-full max-w-md">
      <div className="section-card space-y-4">
        <h1 className="text-2xl font-bold">Login administrativo</h1>
        <p className="text-sm text-zinc-400">Acesso restrito para gestão de conteúdo e configurações da plataforma.</p>
        <label className="space-y-1.5 text-sm">
          <span>E-mail</span>
          <input className="input-base" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="space-y-1.5 text-sm">
          <span>Senha</span>
          <input type="password" className="input-base" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </label>
        {erro && <p className="text-sm text-red-300">{erro}</p>}
        <button
          className="button-primary w-full px-4 py-3"
          onClick={async () => {
            try {
              setErro('');
              await entrar(email, senha);
              navigate('/admin');
            } catch {
              setErro('Falha no login ou usuário sem perfil admin.');
            }
          }}
        >
          Entrar
        </button>
      </div>
    </section>
  );
}
