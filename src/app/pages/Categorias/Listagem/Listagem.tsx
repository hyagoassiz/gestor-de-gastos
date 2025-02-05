import { useTranslation } from "react-i18next";
import { TitlePage } from "../../../shared/components/TitlePage/TItlePage";
import { ModalCategoria } from "./components/ModalCategoria";
import { Filtro } from "./components/Filtro";
import { ModalInativar } from "./components/ModalInativar";
import { ToolPainel } from "../../../shared/components/ToolPanel/ToolPanel";
import { Button } from "@mui/material";
import { FilterIcon } from "../../../shared/components/FilterIcon";
import useListagem from "./hooks/useListagem";
import { DataTable } from "../../../shared/components/DataTable/DataTable";
import { categoriasColumns } from "./constants/constants";
import { mountData } from "./utils/mountData";

export const Listagem: React.FC = () => {
  const {
    categorias,
    searchBar,
    badgeCount,
    handleAdicionarCategoria,
    handleAtivarCategoria,
    handleEditarCategoria,
    handleInativarCategoria,
    handleToggleFiltro,
  } = useListagem();

  const { t } = useTranslation();

  return (
    <>
      <TitlePage
        title={t("PAGES.CATEGORIAS.TITLE")}
        subTitle={t("PAGES.CATEGORIAS.SUBTITLE")}
      />

      <ToolPainel
        buttons={
          <>
            <Button variant="contained" onClick={handleAdicionarCategoria}>
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

      <DataTable
        columns={categoriasColumns}
        data={mountData({
          categorias,
          handleInativarCategoria,
          handleEditarCategoria,
          handleAtivarCategoria,
        })}
        textForEmptyData={t("PAGES.CATEGORIAS.DATA_TABLE.TEXT_FOR_EMPTY_DATA")}
      />

      <ModalCategoria />

      <ModalInativar />

      <Filtro />
    </>
  );
};
