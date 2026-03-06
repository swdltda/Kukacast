import { createBrowserRouter } from "react-router";
import { PaginaInicial } from "./pages/pagina-inicial";
import { SobreProjeto } from "./pages/sobre-o-projeto";
import { FelipeCosta } from "./pages/felipe-costa";
import { Workshops } from "./pages/workshops";
import { AreaParticipante } from "./pages/area-do-participante";
import { PainelAdministrativo } from "./pages/painel-administrativo";
import { Confirmacao } from "./pages/confirmacao";
import { LoginParticipante } from "./pages/login-participante";
import { LoginAdmin } from "./pages/login-admin";
import { RootLayout } from "./components/root-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: PaginaInicial },
      { path: "sobre-o-projeto", Component: SobreProjeto },
      { path: "felipe-costa", Component: FelipeCosta },
      { path: "workshops", Component: Workshops },
      { path: "area-do-participante", Component: AreaParticipante },
      { path: "painel-administrativo", Component: PainelAdministrativo },
      { path: "confirmacao", Component: Confirmacao },
      { path: "login-participante", Component: LoginParticipante },
      { path: "login-admin", Component: LoginAdmin },
    ],
  },
]);