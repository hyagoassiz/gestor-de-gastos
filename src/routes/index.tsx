import {
  Routes,
  Route,
  Outlet,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import * as PATHS from "./paths";
import { SaldosListagemRoute } from "@/pages/Saldos";
import { DashboardListagemRoute } from "@/pages/Dashboard";
import { ContasCadastroRoute, ContasListagemRoute } from "@/pages/Contas";
import {
  TransacoesCadastroRoute,
  TransacoesListagemRoute,
} from "@/pages/Transacoes";
import { PageLayout } from "@/layouts/PageLayout";
import {
  CreateAccountRoute,
  LoginRoute,
  PersonalInfoRoute,
  VerificationRoute,
} from "@/pages/Auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SettingsRoute } from "@/pages/Settings";
import { AboutRoute } from "@/pages/About";
import { CategoriasListagemRoute } from "@/pages/Categorias";
import { CategoriasCadastroRoute } from "@/pages/Categorias/Cadastro";

const LayoutWrapper = () => (
  <PageLayout>
    <Outlet />
  </PageLayout>
);

export const AppRoutes = () => {
  return (
    <BrowserRouter>
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
                <DashboardListagemRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.TRANSACOES.LIST}
            element={
              <ProtectedRoute permission="">
                <TransacoesListagemRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.TRANSACOES.CREATE}
            element={
              <ProtectedRoute permission="">
                <TransacoesCadastroRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.TRANSACOES.EDIT}
            element={
              <ProtectedRoute permission="">
                <TransacoesCadastroRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.TRANSACOES.VIEW}
            element={
              <ProtectedRoute permission="">
                <TransacoesCadastroRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.SALDOS.LIST}
            element={
              <ProtectedRoute permission="">
                <SaldosListagemRoute />
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
            path={PATHS.CONTAS.CREATE}
            element={
              <ProtectedRoute permission="">
                <ContasCadastroRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.CONTAS.EDIT}
            element={
              <ProtectedRoute permission="">
                <ContasCadastroRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.CONTAS.VIEW}
            element={
              <ProtectedRoute permission="">
                <ContasCadastroRoute />
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
            path={PATHS.CATEGORIAS.CREATE}
            element={
              <ProtectedRoute permission="">
                <CategoriasCadastroRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.CATEGORIAS.EDIT}
            element={
              <ProtectedRoute permission="">
                <CategoriasCadastroRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.CATEGORIAS.VIEW}
            element={
              <ProtectedRoute permission="">
                <CategoriasCadastroRoute />
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
    </BrowserRouter>
  );
};
