import { Button } from "@mui/material";
import { Frame } from "../../../components/Frame";
import { Header } from "../../../components/Header";
import { ToolbarContainer } from "../../../components/ToolbarContainer";
import { Add } from "@mui/icons-material";
import { useListagem } from "./hooks/useListagem";
import { DataTable } from "../../../components/DataTable/DataTable";
import { proventosColumns } from "./constants/constants";
import { mountData } from "./utils/mountData";
import { OperacaoModal } from "./components/OperacaoModal";

export const Listagem: React.FC = () => {
  const {
    operacoes,
    operacaoModalState,
    closeOperacaoModal,
    handleEditarOperacao,
    openOperacaoModal,
  } = useListagem();

  return (
    <>
      <Header title="Operações" />

      <Frame>
        <ToolbarContainer
          title={`Operações`}
          showTitleDivider
          showDividers
          buttons={
            <>
              <Button
                startIcon={<Add />}
                color="primary"
                variant="outlined"
                onClick={openOperacaoModal}
              >
                Nova
              </Button>
            </>
          }
        />

        <DataTable
          columns={proventosColumns}
          data={mountData({
            operacoes,
            handleEditarOperacao,
          })}
          textForEmptyData="Nenhum provento encontrado."
        />
      </Frame>

      {operacaoModalState.open && (
        <OperacaoModal
          operacao={operacaoModalState.operacao}
          open={operacaoModalState.open}
          onClose={closeOperacaoModal}
        />
      )}
    </>
  );
};
