import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

export function LoginPage() {
  const { login, loading, usuarioAuth } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!loading && usuarioAuth) navigate('/area-do-participante', { replace: true });
  }, [loading, navigate, usuarioAuth]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro('');

    try {
      await login(email.trim().toLowerCase(), senha);
      navigate('/area-do-participante', { replace: true });
    } catch {
      setErro('Não foi possível entrar. Verifique e-mail e senha.');
    }
  }

  return (
    <section className="mx-auto w-full max-w-md">
      <form className="section-card space-y-4" onSubmit={onSubmit}>
        <h1 className="text-2xl font-bold">Entrar</h1>
        <p className="text-sm text-zinc-400">Acesse sua conta para acompanhar inscrições e materiais.</p>

        <label className="space-y-1.5 text-sm">
          <span>E-mail</span>
          <input type="email" className="input-base" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        </label>

        <label className="space-y-1.5 text-sm">
          <span>Senha</span>
          <input type="password" className="input-base" value={senha} onChange={(e) => setSenha(e.target.value)} required autoComplete="current-password" />
        </label>

        {erro && <p className="text-sm text-red-300">{erro}</p>}

        <button type="submit" className="button-primary w-full px-4 py-3" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="text-sm text-zinc-300">
          Ainda não tem conta?{' '}
          <Link to="/cadastro" className="text-orange-300 hover:text-orange-200">
            Cadastre-se
          </Link>
        </p>
      </form>
    </section>
  );
}
