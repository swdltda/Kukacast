import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

type FormCadastro = {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  cidade: string;
  data_nascimento: string;
};

const initialForm: FormCadastro = {
  nome: '',
  email: '',
  senha: '',
  telefone: '',
  cidade: '',
  data_nascimento: '',
};

export function CadastroPage() {
  const navigate = useNavigate();
  const { cadastro, loading } = useAuth();
  const [form, setForm] = useState<FormCadastro>(initialForm);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro('');
    setSucesso('');

    try {
      const { requerConfirmacaoEmail } = await cadastro(form);
      if (requerConfirmacaoEmail) {
        setSucesso('Cadastro realizado. Confira seu e-mail para confirmar a conta antes de entrar.');
        setForm(initialForm);
        return;
      }

      setSucesso('Cadastro concluído com sucesso! Redirecionando para sua área...');
      setTimeout(() => navigate('/area-do-participante'), 1200);
    } catch {
      setErro('Não foi possível concluir o cadastro. Verifique os dados e tente novamente.');
    }
  }

  return (
    <section className="mx-auto w-full max-w-xl">
      <form className="section-card grid gap-4" onSubmit={onSubmit}>
        <div>
          <h1 className="text-2xl font-bold">Criar conta</h1>
          <p className="text-sm text-zinc-400">Cadastre-se para acessar workshops, conteúdos e materiais exclusivos.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1.5 text-sm sm:col-span-2">
            <span>Nome</span>
            <input className="input-base" value={form.nome} onChange={(e) => setForm((old) => ({ ...old, nome: e.target.value }))} required />
          </label>

          <label className="space-y-1.5 text-sm">
            <span>E-mail</span>
            <input
              type="email"
              className="input-base"
              value={form.email}
              onChange={(e) => setForm((old) => ({ ...old, email: e.target.value }))}
              required
            />
          </label>

          <label className="space-y-1.5 text-sm">
            <span>Senha</span>
            <input
              type="password"
              className="input-base"
              value={form.senha}
              onChange={(e) => setForm((old) => ({ ...old, senha: e.target.value }))}
              minLength={6}
              required
            />
          </label>

          <label className="space-y-1.5 text-sm">
            <span>Telefone</span>
            <input className="input-base" value={form.telefone} onChange={(e) => setForm((old) => ({ ...old, telefone: e.target.value }))} />
          </label>

          <label className="space-y-1.5 text-sm">
            <span>Data de nascimento</span>
            <input
              type="date"
              className="input-base"
              value={form.data_nascimento}
              onChange={(e) => setForm((old) => ({ ...old, data_nascimento: e.target.value }))}
            />
          </label>

          <label className="space-y-1.5 text-sm sm:col-span-2">
            <span>Cidade</span>
            <input className="input-base" value={form.cidade} onChange={(e) => setForm((old) => ({ ...old, cidade: e.target.value }))} />
          </label>
        </div>

        {erro && <p className="text-sm text-red-300">{erro}</p>}
        {sucesso && <p className="text-sm text-emerald-300">{sucesso}</p>}

        <button type="submit" className="button-primary w-full px-4 py-3" disabled={loading}>
          {loading ? 'Criando conta...' : 'Cadastrar'}
        </button>

        <p className="text-sm text-zinc-300">
          Já tem conta?{' '}
          <Link to="/login" className="text-orange-300 hover:text-orange-200">
            Entrar
          </Link>
        </p>
      </form>
    </section>
  );
}
