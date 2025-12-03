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
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { CategoriasListagemRoute } from "@/pages/Categorias";
import { CategoriasCadastroRoute } from "@/pages/Categorias/Cadastro";
import {
  CriarContaRoute,
  LoginRoute,
  VerificarContaRoute,
} from "@/pages/Autenticacao";
import { ConfiguracoesListagemRoute } from "@/pages/Configuracoes";
import { ObjetivosListagemRoute } from "@/pages/Objetivos/Listagem";
import { ObjetivosCadastroRoute } from "@/pages/Objetivos";

const LayoutWrapper = () => (
  <PageLayout>
    <Outlet />
  </PageLayout>
);

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.AUTENTICACAO.LOGIN} element={<LoginRoute />} />

        <Route path={PATHS.AUTENTICACAO.CREATE} element={<CriarContaRoute />} />

        <Route
          path={PATHS.AUTENTICACAO.VERIFICATION}
          element={
            <ProtectedRoute permission="">
              <VerificarContaRoute />
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
            path={PATHS.OBJETIVOS.LISTAGEM}
            element={
              <ProtectedRoute permission="">
                <ObjetivosListagemRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.OBJETIVOS.CADASTRO}
            element={
              <ProtectedRoute permission="">
                <ObjetivosCadastroRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.OBJETIVOS.EDITAR}
            element={
              <ProtectedRoute permission="">
                <ObjetivosCadastroRoute />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.OBJETIVOS.VIEW}
            element={
              <ProtectedRoute permission="">
                <ObjetivosCadastroRoute />
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
            path={PATHS.CONFIGURACOES.LISTAGEM}
            element={
              <ProtectedRoute permission="">
                <ConfiguracoesListagemRoute />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to={PATHS.DASHBOARD.LIST} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
