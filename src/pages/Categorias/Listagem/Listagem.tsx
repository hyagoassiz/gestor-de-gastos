import { Button } from "@mui/material";
import { Frame } from "../../../components/Frame";
import { Add } from "@mui/icons-material";
import { useListagem } from "./hooks/useListagem";
import { DataTable } from "../../../components/DataTable/DataTable";
import { categoriasColumns } from "./constants/constants";
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
        title="Categorias"
        breadcrumbs={[{ label: "Categorias" }]}
        rightContent={
          <Button
            startIcon={<Add />}
            color="primary"
            variant="outlined"
            onClick={listagem.handleAdicionarCategoria}
          >
            Adicionar Categoria
          </Button>
        }
      />

      <Frame>
        {!listagem.queryGetCategoriasPaginado.isLoading && (
          <DataTable
            columns={categoriasColumns}
            data={mountData(listagem)}
            page={(listagem.categorias?.number ?? 0) + 1}
            totalPages={listagem.categorias?.totalPages}
            onPageChange={(newPage) => listagem.handleChangePage(newPage - 1)}
            textForEmptyData="Nenhuma categoria encontrada."
            toolbar={
              <>
                <SearchBar searchBar={listagem.searchBar} />

                <Filtro
                  defaultValue={!listagem.categoriaListPayload.ativo}
                  filterCount={listagem.filterCount}
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
