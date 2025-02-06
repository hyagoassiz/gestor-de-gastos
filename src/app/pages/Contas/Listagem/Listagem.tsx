import { useTranslation } from "react-i18next";
import { TitlePage } from "../../../shared/components/TitlePage/TItlePage";
import { ModalConta } from "./components/ModalConta";
import { Filtro } from "./components/Filtro";
import { ModalInativar } from "./components/ModalInativar";
import { ToolPainel } from "../../../shared/components/ToolPanel/ToolPanel";
import { Button } from "@mui/material";
import { FilterIcon } from "../../../shared/components/FilterIcon";
import useListagem from "./hooks/useListagem";
import { DataTable } from "../../../shared/components/DataTable/DataTable";
import { mountData } from "./utils/mountData";
import { contasColumns } from "./constants/constants";

export const Listagem: React.FC = () => {
  const {
    contas,
    searchBar,
    badgeCount,
    handleAdicionarConta,
    handleAtivarConta,
    handleEditarConta,
    handleInativarConta,
    toggleFiltro,
  } = useListagem();

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
            <Button variant="contained" onClick={handleAdicionarConta}>
              {t("BUTTONS.ADD")}
            </Button>
            <FilterIcon onClick={toggleFiltro} badgeContent={badgeCount} />
          </>
        }
        searchBar={searchBar}
      />

      <DataTable
        columns={contasColumns}
        data={mountData({
          contas,
          handleInativarConta,
          handleEditarConta,
          handleAtivarConta,
        })}
        textForEmptyData={t("PAGES.CONTAS.DATA_TABLE.TEXT_FOR_EMPTY_DATA")}
      />

      <ModalConta />

      <ModalInativar />

      <Filtro />
    </>
  );
};
