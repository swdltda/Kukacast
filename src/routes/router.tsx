import { createBrowserRouter } from 'react-router';
import { LayoutPublico } from '@/layouts/LayoutPublico';
import { LayoutAdmin } from '@/layouts/LayoutAdmin';
import { HomePage } from '@/pages/HomePage';
import { SobrePage } from '@/pages/SobrePage';
import { EpisodiosPage } from '@/pages/EpisodiosPage';
import { EpisodioDetalhePage } from '@/pages/EpisodioDetalhePage';
import { WorkshopsPage } from '@/pages/WorkshopsPage';
import { WorkshopDetalhePage } from '@/pages/WorkshopDetalhePage';
import { ComunidadePage } from '@/pages/ComunidadePage';
import { AreaParticipantePage } from '@/pages/AreaParticipantePage';
import { LoginAdminPage } from '@/pages/LoginAdminPage';
import { LoginPage } from '@/pages/LoginPage';
import { CadastroPage } from '@/pages/CadastroPage';
import { AdminResumoPage } from '@/pages/AdminResumoPage';
import { AdminEpisodiosPage } from '@/pages/AdminEpisodiosPage';
import { AdminWorkshopsPage } from '@/pages/AdminWorkshopsPage';
import { AdminParticipantesPage } from '@/pages/AdminParticipantesPage';
import { AdminConfiguracoesPage } from '@/pages/AdminConfiguracoesPage';
import { AdminRoute } from '@/routes/AdminRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPublico />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'sobre', element: <SobrePage /> },
      { path: 'episodios', element: <EpisodiosPage /> },
      { path: 'episodio/:slug', element: <EpisodioDetalhePage /> },
      { path: 'workshops', element: <WorkshopsPage /> },
      { path: 'workshop/:slug', element: <WorkshopDetalhePage /> },
      { path: 'comunidade', element: <ComunidadePage /> },
      { path: 'area-do-participante', element: <AreaParticipantePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'cadastro', element: <CadastroPage /> },
      { path: 'login-admin', element: <LoginAdminPage /> },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
      {
        path: '/admin',
        element: <LayoutAdmin />,
        children: [
          { index: true, element: <AdminResumoPage /> },
          { path: 'episodios', element: <AdminEpisodiosPage /> },
          { path: 'workshops', element: <AdminWorkshopsPage /> },
          { path: 'participantes', element: <AdminParticipantesPage /> },
          { path: 'configuracoes', element: <AdminConfiguracoesPage /> },
        ],
      },
    ],
  },
]);
