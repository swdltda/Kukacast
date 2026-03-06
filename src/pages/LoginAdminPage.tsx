import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

export function LoginAdminPage() {
  const { login, isAdmin, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!loading && isAdmin) navigate('/admin', { replace: true });
  }, [isAdmin, loading, navigate]);

  return (
    <section className="mx-auto w-full max-w-md">
      <form
        className="section-card space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          setErro('');
          try {
            const perfilLogado = await login(email.trim().toLowerCase(), senha);
            if (perfilLogado?.tipo_usuario !== 'admin') {
              await logout();
              setErro('Seu usuário não possui acesso administrativo.');
              return;
            }
            navigate('/admin');
          } catch {
            setErro('Falha no login. Verifique credenciais e tente novamente.');
          }
        }}
      >
        <h1 className="text-2xl font-bold">Login administrativo</h1>
        <p className="text-sm text-zinc-400">Acesso restrito para gestão de conteúdo e configurações da plataforma.</p>
        <label className="space-y-1.5 text-sm">
          <span>E-mail</span>
          <input type="email" className="input-base" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="space-y-1.5 text-sm">
          <span>Senha</span>
          <input type="password" className="input-base" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </label>
        {erro && <p className="text-sm text-red-300">{erro}</p>}
        <button className="button-primary w-full px-4 py-3" type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        <p className="text-sm text-zinc-300">
          Não é admin?{' '}
          <Link to="/login" className="text-orange-300 hover:text-orange-200">
            Acesse a área pública
          </Link>
        </p>
      </form>
    </section>
  );
}
