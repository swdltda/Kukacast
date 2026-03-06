import { createBrowserRouter } from 'react-router';
import { LayoutPublico } from '@/layouts/LayoutPublico';
import { LayoutAdmin } from '@/layouts/LayoutAdmin';
import { HomePage } from '@/pages/HomePage';
import { SobrePage } from '@/pages/SobrePage';
import { FelipeCostaPage } from '@/pages/FelipeCostaPage';
import { EpisodiosPage } from '@/pages/EpisodiosPage';
import { EpisodioDetalhePage } from '@/pages/EpisodioDetalhePage';
import { WorkshopsPage } from '@/pages/WorkshopsPage';
import { WorkshopDetalhePage } from '@/pages/WorkshopDetalhePage';
import { ComunidadePage } from '@/pages/ComunidadePage';
import { AreaParticipantePage } from '@/pages/AreaParticipantePage';
import { LoginAdminPage } from '@/pages/LoginAdminPage';
import { AdminResumoPage } from '@/pages/AdminResumoPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPublico />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'sobre', element: <SobrePage /> },
      { path: 'felipe-costa', element: <FelipeCostaPage /> },
      { path: 'episodios', element: <EpisodiosPage /> },
      { path: 'episodio/:slug', element: <EpisodioDetalhePage /> },
      { path: 'workshops', element: <WorkshopsPage /> },
      { path: 'workshop/:slug', element: <WorkshopDetalhePage /> },
      { path: 'comunidade', element: <ComunidadePage /> },
      { path: 'area-do-participante', element: <AreaParticipantePage /> },
      { path: 'login-admin', element: <LoginAdminPage /> },
      {
        path: 'admin',
        element: <LayoutAdmin />,
        children: [{ index: true, element: <AdminResumoPage /> }],
      },
    ],
  },
]);
