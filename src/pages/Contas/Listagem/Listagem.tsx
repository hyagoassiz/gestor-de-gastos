import { Button } from "@mui/material";
import { Frame } from "../../../components/Frame";
import { Add } from "@mui/icons-material";
import { useListagem } from "./hooks/useListagem";
import { DataTable } from "../../../components/DataTable/DataTable";
import { contasColumns } from "./constants/constants";
import { mountData } from "./utils/mountData";
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
        breadcrumbs={[{ label: "Contas" }]}
        rightContent={
          <Button
            startIcon={<Add />}
            color="primary"
            variant="outlined"
            onClick={listagem.handleAdicionarConta}
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
            totalPages={listagem.queryGetContasPaginado.data?.totalPages}
            textForEmptyData="Nenhuma conta encontrada."
            toolbar={
              <>
                <SearchBar searchBar={listagem.searchBar} />

                <Filtro
                  filterCount={0}
                  applyFilter={listagem.handleSubmitFilterForm}
                />
              </>
            }
          />
        )}
      </Frame>
    </FormProvider>
  );
};
