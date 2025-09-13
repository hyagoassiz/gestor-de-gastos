import { Button } from "@mui/material";
import { Frame } from "../../../components/Frame";
import { Add } from "@mui/icons-material";
import { useListagem } from "./hooks/useListagem";
import { DataTable } from "../../../components/DataTable/DataTable";
import { contasColumns } from "./constants/constants";
import { mountData } from "./utils/mountData";
import ToolbarContainer from "../../../components/ToolbarContainer/ToolbarContainer";
import Header from "../../../components/Header/Header";
import { ModalConta } from "./components/ModalConta";
import { FormProvider } from "react-hook-form";
import { Filtro } from "./components/Filtro";

export const Listagem: React.FC = () => {
  const {
    contas,
    modalContaState,
    filterForm,
    filterCount,
    contaListPayload,
    closeModalConta,
    handleAtivarContaById,
    handleChangePage,
    handleEditarConta,
    handleInativarContaById,
    handleSubmitFilterForm,
    openModalConta,
  } = useListagem();

  return (
    <FormProvider {...filterForm}>
      <Header
        title="Contas"
        buttons={
          <Filtro
            defaultValue={!contaListPayload.ativo}
            filterCount={filterCount}
            applyFilter={handleSubmitFilterForm}
          />
        }
      />

      <Frame>
        <ToolbarContainer
          title={`Contas (${contas?.totalElements})`}
          showTitleDivider
          showDividers
          buttons={
            <>
              <Button
                startIcon={<Add />}
                color="primary"
                variant="outlined"
                onClick={openModalConta}
              >
                NOVA
              </Button>
            </>
          }
        />

        <DataTable
          columns={contasColumns}
          data={mountData({
            contas,
            handleAtivarContaById,
            handleEditarConta,
            handleInativarContaById,
          })}
          page={(contas?.number ?? 0) + 1}
          totalPages={contas?.totalPages}
          onPageChange={(newPage) => handleChangePage(newPage - 1)}
          textForEmptyData="Nenhuma conta encontrada."
        />
      </Frame>

      {modalContaState.open && (
        <ModalConta
          conta={modalContaState.conta}
          open={modalContaState.open}
          onClose={closeModalConta}
        />
      )}
    </FormProvider>
  );
};
