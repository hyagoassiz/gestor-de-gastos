import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import * as PATHS from "./paths";
import { ReactNode } from "react";
import { CategoriasListagemRoute } from "../pages/Categorias";
import { PageLayout } from "../shared/layouts/PageLayout/PageLayout";
import { ContasListagemRoute } from "../pages/Contas";
import {
  CadastroRoute,
  LoginRoute,
  VerificacaoRoute,
} from "../pages/Autenticacao";
import { Private } from "../shared/components/Private";
import { RegistrarNomeRoute } from "../pages/Autenticacao/RegistrarNome";
import { TransacoesListagemRoute } from "../pages/Transacoes";
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <PageLayout>{children}</PageLayout>
  </>
);

export const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={PATHS.AUTENTICACAO.LOGIN} element={<LoginRoute />} />
        <Route path={PATHS.AUTENTICACAO.CREATE} element={<CadastroRoute />} />
        <Route
          path={PATHS.AUTENTICACAO.CHECK}
          element={
            <Private>
              <VerificacaoRoute />
            </Private>
          }
        />
        <Route
          path={PATHS.AUTENTICACAO.CREATE_NAME}
          element={
            <Private>
              <RegistrarNomeRoute />
            </Private>
          }
        />
        <Route
          path="*"
          element={
            // <AppDrawer>
            <>
              <Layout>
                <Routes>
                  <Route
                    path={PATHS.CATEGORIAS.LIST}
                    element={
                      <Private>
                        <CategoriasListagemRoute />
                      </Private>
                    }
                  />
                  <Route
                    path={PATHS.CONTAS.LIST}
                    element={
                      <Private>
                        <ContasListagemRoute />
                      </Private>
                    }
                  />
                  <Route
                    path={PATHS.TRANSACOES.LIST}
                    element={
                      <Private>
                        <TransacoesListagemRoute />
                      </Private>
                    }
                  />
                  <Route
                    path="*"
                    element={<Navigate to={PATHS.CATEGORIAS.LIST} />}
                  />
                </Routes>
              </Layout>
            </>
            // </AppDrawer>
          }
        />
      </Routes>
    </HashRouter>
  );
};
