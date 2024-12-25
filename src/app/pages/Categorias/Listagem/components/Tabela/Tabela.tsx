import { DataTable } from "../../../../../shared/components/DataTable/DataTable";
import useTabela from "./hooks/useTabela";
import { DataColumns } from "./util/constants";
import { mountData } from "./util/mountData";
import { useTranslation } from "react-i18next";

export const Tabela: React.FC = () => {
  const { categorias, handleInativar, handleEditar, handleAtivar } =
    useTabela();

  const { t } = useTranslation();

  return (
    <>
      <DataTable
        columns={DataColumns}
        data={mountData({
          categorias,
          handleInativar,
          handleEditar,
          handleAtivar,
        })}
        textForEmptyData={t("PAGES.CATEGORIAS.DATA_TABLE.TEXT_FOR_EMPTY_DATA")}
      />
    </>
  );
};
