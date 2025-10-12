import { Button } from "@mui/material";
import { Frame } from "../../../components/Frame";
import { Add } from "@mui/icons-material";
import { useListagem } from "./hooks/useListagem";
import { DataTable } from "../../../components/DataTable/DataTable";
import { contasColumns } from "./constants/constants";
import { mountData } from "./utils/mountData";
import { ModalConta } from "./components/ModalConta";
import { FormProvider } from "react-hook-form";
import { Filtro } from "./components/Filtro";
import { PageHeader } from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar/SearchBar";

export const Listagem: React.FC = () => {
  const listagem = useListagem();

  return (
    <FormProvider {...listagem.filterForm}>
      <PageHeader
        title="Contas"
        subTitle="Gerencie suas contas"
        rightContent={
          <Button
            startIcon={<Add />}
            color="primary"
            variant="outlined"
            onClick={listagem.openModalConta}
          >
            Adicionar Conta
          </Button>
        }
      />

      <Frame>
        {!listagem.queryGetContasPaginado.isLoading && (
          <DataTable
            columns={contasColumns}
            data={mountData(listagem)}
            page={(listagem.queryGetContasPaginado.data?.number ?? 0) + 1}
            totalPages={listagem.queryGetContasPaginado.data?.totalPages}
            onPageChange={(newPage) => listagem.handleChangePage(newPage - 1)}
            textForEmptyData="Nenhuma conta encontrada."
            toolbar={
              <>
                <SearchBar searchBar={listagem.searchBar} />

                <Filtro
                  defaultValue={!listagem.contaListPayload.ativo}
                  filterCount={listagem.filterCount}
                  applyFilter={listagem.handleSubmitFilterForm}
                />
              </>
            }
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
