import { useTranslation } from "react-i18next";
import { TitlePage } from "../../../shared/components/TitlePage/TItlePage";
import { ModalCategoria } from "./components/ModalCategoria";
import { CategoriasTable } from "./components/CategoriasTable";
import { Filtro } from "./components/Filtro";
import { ModalInativar } from "./components/ModalInativar";

export const Listagem: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <TitlePage
        title={t("PAGES.CATEGORIAS.TITLE")}
        subTitle={t("PAGES.CATEGORIAS.SUBTITLE")}
      />
      <CategoriasTable />
      <ModalCategoria />
      <ModalInativar />
      <Filtro />
    </>
  );
};
