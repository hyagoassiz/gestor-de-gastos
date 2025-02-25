import { useTranslation } from "react-i18next";
import { TitlePage } from "../../../shared/components/TitlePage/TItlePage";
import { ToolPainel } from "../../../shared/components/ToolPanel/ToolPanel";
import { Button } from "@mui/material";
import useListagem from "./hooks/useListagem";
import { FilterIcon } from "../../../shared/components/FilterIcon";
import { DataTable } from "../../../shared/components/DataTable/DataTable";
import { transacoesColumns } from "./constants/constants";
import { mountData } from "./util/mountData";
import { ModalTransacao } from "./components/ModalTransacao";
import { Filtro } from "./components/Filtro";
import { ModalExcluir } from "./components/ModalExcluir";
import { ModalObservacao } from "./components/ModalObservacao";

export const Listagem: React.FC = () => {
  const {
    transacoes,
    badgeCount,
    handleAdicionarTransacao,
    handleEditarTransacao,
    handleExcluirTransacao,
    toggleFiltro,
    toggleModalObservacao,
  } = useListagem();

  const { t } = useTranslation();

  return (
    <>
      <TitlePage title={"Transações"} subTitle={"Registre entradas e saídas"} />

      <ToolPainel
        buttons={
          <>
            <Button
              color="info"
              variant="contained"
              onClick={handleAdicionarTransacao}
            >
              {t("BUTTONS.ADD")}
            </Button>
            <FilterIcon onClick={toggleFiltro} badgeContent={badgeCount} />
          </>
        }
      />

      <DataTable
        columns={transacoesColumns}
        data={mountData({
          transacoes,
          handleEditarTransacao,
          handleExcluirTransacao,
          toggleModalObservacao,
        })}
        textForEmptyData={t("Nenhuma transação encontrada.")}
      />

      <ModalTransacao />

      <ModalExcluir />

      <ModalObservacao />

      <Filtro />
    </>
  );
};
