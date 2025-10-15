import { HashRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import * as PATHS from "./paths";
import { PageLayout } from "../layouts/PageLayout/PageLayout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { LoginRoute } from "../pages/Auth/Login";
import { CreateAccountRoute } from "../pages/Auth/CreateAccount";
import { VerificationRoute } from "../pages/Auth/Verification";
import { PersonalInfoRoute } from "../pages/Auth/PersonalInfo";
import { AboutRoute } from "../pages/About/List";
import { SettingsRoute } from "../pages/Settings/List";
import { ContasListagemRoute } from "../pages/Contas";
import { CategoriasListagemRoute } from "../pages/Categorias";
import { TransacoesListagemRoute } from "../pages/Transacoes";
import { SaldosListagemRoute } from "@/pages/Saldos";
import { DashboardListagemRoute } from "@/pages/Dashboard/Listagem";
import { ContasCadastroRoute } from "@/pages/Contas/Cadastro";
import { TransacoesCadastroRoute } from "@/pages/Transacoes/Cadastro";

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
