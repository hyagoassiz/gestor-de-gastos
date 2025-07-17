import { Button } from "@mui/material";
import { Frame } from "../../../components/Frame";
import { Add, UploadFile } from "@mui/icons-material";
import { useListagem } from "./hooks/useListagem";
import { DataTable } from "../../../components/DataTable/DataTable";
import { proventosColumns } from "./constants/constants";
import { mountData } from "./utils/mountData";
import { ModalOperacao } from "./components/ModalOperacao";
import usePostOperacaoEmLote from "./hooks/usePostOperacaoEmLote";
import ToolbarContainer from "../../../components/ToolbarContainer/ToolbarContainer";
import Header from "../../../components/Header/Header";

export const Listagem: React.FC = () => {
  const {
    operacoes,
    operacaoModalState,
    closeOperacaoModal,
    handleEditarOperacao,
    handleDuplicarOperacao,
    openOperacaoModal,
  } = useListagem();

  const { fileInputRef, handleFileChange, handleImportClick } =
    usePostOperacaoEmLote();

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

              <input
                type="file"
                accept=".xlsx, .xls"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <Button
                startIcon={<UploadFile />}
                color="secondary"
                variant="outlined"
                onClick={handleImportClick}
              >
                Importar Excel
              </Button>
            </>
          }
        />

        <DataTable
          columns={proventosColumns}
          data={mountData({
            operacoes,
            handleEditarOperacao,
            handleDuplicarOperacao,
          })}
          textForEmptyData="Nenhum provento encontrado."
        />
      </Frame>

      {operacaoModalState.open && (
        <ModalOperacao
          operacao={operacaoModalState.operacao}
          open={operacaoModalState.open}
          isDuplicating={operacaoModalState.isDuplicating}
          onClose={closeOperacaoModal}
        />
      )}
    </>
  );
};
