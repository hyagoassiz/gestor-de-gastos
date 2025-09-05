import { HashRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import * as PATHS from "./paths";
import { PageLayout } from "../layouts/PageLayout/PageLayout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { LoginRoute } from "../pages/Auth/Login";
import { CreateAccountRoute } from "../pages/Auth/CreateAccount";
import { VerificationRoute } from "../pages/Auth/Verification";
import { PersonalInfoRoute } from "../pages/Auth/PersonalInfo";
import { DashboardRoute } from "../pages/Dashboard/List";
import { AboutRoute } from "../pages/About/List";
import { SettingsRoute } from "../pages/Settings/List";
import { AtivosListagemRoute } from "../pages/Ativos";
import { ProventosListagemRoute } from "../pages/Proventos";
import { OperacoesListagemRoute } from "../pages/Operacoes";
import {
  ResumoAtivoListagemRoute,
  ResumoAtivoResumoRoute,
} from "../pages/ResumoAtivo";
import { ContasListagemRoute } from "../pages/Contas";
import { CategoriasListagemRoute } from "../pages/Categorias";

const LayoutWrapper = () => (
  <PageLayout>
    <Outlet />
  </PageLayout>
);

export const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={PATHS.AUTH.LOGIN} element={<LoginRoute />} />

        <Route path={PATHS.AUTH.CREATE} element={<CreateAccountRoute />} />

        <Route
          path={PATHS.AUTH.VERIFICATION}
          element={
            <ProtectedRoute permission="">
              <VerificationRoute />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATHS.AUTH.INFO}
          element={
            <ProtectedRoute permission="">
              <PersonalInfoRoute />
            </ProtectedRoute>
          }
        />

        <Route element={<LayoutWrapper />}>
          <Route
            path={PATHS.DASHBOARD.LIST}
            element={
              <ProtectedRoute permission="">
                <DashboardRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.OPERACOES.LIST}
            element={
              <ProtectedRoute permission="">
                <OperacoesListagemRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.PROVENTOS.LIST}
            element={
              <ProtectedRoute permission="">
                <ProventosListagemRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.RESUMO_ATIVO.LIST}
            element={
              <ProtectedRoute permission="">
                <ResumoAtivoListagemRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.RESUMO_ATIVO.RESUMO}
            element={
              <ProtectedRoute permission="">
                <ResumoAtivoResumoRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.ATIVOS.LIST}
            element={
              <ProtectedRoute permission="">
                <AtivosListagemRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.CONTAS.LISTAGEM}
            element={
              <ProtectedRoute permission="">
                <ContasListagemRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.CATEGORIAS.LISTAGEM}
            element={
              <ProtectedRoute permission="">
                <CategoriasListagemRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.ABOUT.LIST}
            element={
              <ProtectedRoute permission="">
                <AboutRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.SETTINGS.LIST}
            element={
              <ProtectedRoute permission="">
                <SettingsRoute />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to={PATHS.DASHBOARD.LIST} />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
