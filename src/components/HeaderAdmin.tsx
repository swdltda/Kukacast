import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

export function HeaderAdmin() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="section-card flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-orange-200/80">Admin</p>
        <h1 className="text-2xl font-semibold">Gestão institucional</h1>
      </div>
      <button
        className="button-secondary px-4 py-2 text-sm"
        onClick={async () => {
          await logout();
          navigate('/login-admin');
        }}
      >
        Sair
      </button>
    </header>
  );
}
