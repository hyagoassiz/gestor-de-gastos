import { Button } from "@mui/material";
import { DataTable } from "../../../../../shared/components/DataTable/DataTable";
import { ToolPainel } from "../../../../../shared/components/ToolPanel/ToolPanel";
import useCategoriasTable from "./hooks/useCategoriasTable";
import { DataColumns } from "./util/constants";
import { mountData } from "./util/mountData";
import { FilterIcon } from "../../../../../shared/components/FilterIcon";
import { useTranslation } from "react-i18next";

export const CategoriasTable: React.FC = () => {
  const { categorias, handleToggleFiltro, handleInativar, handleAdicionar } =
    useCategoriasTable();

  const { t } = useTranslation();

  return (
    <>
      <ToolPainel
        buttons={
          <>
            <Button variant="contained" onClick={handleAdicionar}>
              {t("buttons.add")}
            </Button>
            <FilterIcon onClick={handleToggleFiltro} badgeContent={1} />
          </>
        }
      />

      <DataTable
        columns={DataColumns}
        data={mountData({ categorias, handleInativar })}
        textForEmptyData={t("categorias.dataTable.textForEmptyData")}
      />
    </>
  );
};
