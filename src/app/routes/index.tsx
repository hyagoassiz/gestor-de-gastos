import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import * as PATHS from "./paths";
import { ReactNode } from "react";
import { CategoriasListagemRoute } from "../pages/Categorias";
import { PageLayout } from "../shared/layouts/PageLayout/PageLayout";

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
        {/* <Route path={PATHS.AUTENTICACAO.LOGIN} element={<LoginRoute />} />
        <Route path={PATHS.AUTENTICACAO.CREATE} element={<CadastroRoute />} />
        <Route
          path={PATHS.AUTENTICACAO.CHECK}
          element={
            <Private>
              <VerificacaoRoute />
            </Private>
          }
        /> */}
        <Route
          path="*"
          element={
            // <AppDrawer>
            <>
              <Layout>
                <Routes>
                  <Route
                    path={PATHS.CATEGORIAS.LIST}
                    element={<CategoriasListagemRoute />}
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
