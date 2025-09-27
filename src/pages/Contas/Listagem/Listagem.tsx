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
  const listagem = useListagem();

  return (
    <FormProvider {...listagem.filterForm}>
      <Header
        title="Contas"
        searchBar={listagem.searchBar}
        buttons={
          <Filtro
            defaultValue={!listagem.contaListPayload.ativo}
            filterCount={listagem.filterCount}
            applyFilter={listagem.handleSubmitFilterForm}
          />
        }
      />

      <Frame>
        <ToolbarContainer
          title={`Contas (${
            listagem.queryGetContasPaginado.data?.totalElements ?? 0
          })`}
          showTitleDivider
          showDividers
          buttons={
            <>
              <Button
                startIcon={<Add />}
                color="primary"
                variant="outlined"
                onClick={listagem.openModalConta}
              >
                NOVA
              </Button>
            </>
          }
        />

        {!listagem.queryGetContasPaginado.isLoading && (
          <DataTable
            columns={contasColumns}
            data={mountData(listagem)}
            page={(listagem.queryGetContasPaginado.data?.number ?? 0) + 1}
            totalPages={listagem.queryGetContasPaginado.data?.totalPages}
            onPageChange={(newPage) => listagem.handleChangePage(newPage - 1)}
            textForEmptyData="Nenhuma conta encontrada."
          />
        )}
      </Frame>

      {listagem.modalContaState.open && (
        <ModalConta
          conta={listagem.modalContaState.conta}
          open={listagem.modalContaState.open}
          onClose={listagem.closeModalConta}
        />
      )}
    </FormProvider>
  );
};
