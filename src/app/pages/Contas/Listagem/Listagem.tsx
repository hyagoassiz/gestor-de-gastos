import { useTranslation } from "react-i18next";
import { TitlePage } from "../../../shared/components/TitlePage/TItlePage";
import { ModalConta } from "./components/ModalConta";
import { Filtro } from "./components/Filtro";
import { ModalInativar } from "./components/ModalInativar";
import { ToolPainel } from "../../../shared/components/ToolPanel/ToolPanel";
import { Button } from "@mui/material";
import { FilterIcon } from "../../../shared/components/FilterIcon";
import useListagem from "./hooks/useListagem";
import { Tabela } from "./components/Tabela";

export const Listagem: React.FC = () => {
  const { handleToggleFiltro, handleAdicionar, badgeCount, searchBar } =
    useListagem();

  const { t } = useTranslation();

  return (
    <>
      <TitlePage
        title={t("PAGES.CONTAS.TITLE")}
        subTitle={t("PAGES.CONTAS.SUBTITLE")}
      />

      <ToolPainel
        buttons={
          <>
            <Button variant="contained" onClick={handleAdicionar}>
              {t("BUTTONS.ADD")}
            </Button>
            <FilterIcon
              onClick={handleToggleFiltro}
              badgeContent={badgeCount}
            />
          </>
        }
        searchBar={searchBar}
      />

      <Tabela />

      <ModalConta />

      <ModalInativar />

      <Filtro />
    </>
  );
};
