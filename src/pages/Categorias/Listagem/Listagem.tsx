import { Button } from "@mui/material";
import { Frame } from "../../../components/Frame";
import { Add } from "@mui/icons-material";
import { useListagem } from "./hooks/useListagem";
import { DataTable } from "../../../components/DataTable/DataTable";
import { categoriasColumns } from "./constants/constants";
import { mountData } from "./utils/mountData";
import { FormProvider } from "react-hook-form";
import { Filtro } from "./components/Filtro";
import { ModalCategoria } from "./components/ModalCategoria";
import { PageHeader } from "@/components/PageHeader";

export const Listagem: React.FC = () => {
  const {
    categorias,
    modalCategoriaState,
    filterForm,
    filterCount,
    categoriaListPayload,
    closeModalCategoria,
    handleAtivarCategoriaById,
    handleChangePage,
    handleEditarCategoria,
    handleInativarCategoriaById,
    handleSubmitFilterForm,
    openModalCategoria,
  } = useListagem();

  return (
    <FormProvider {...filterForm}>
      <PageHeader
        title="Categorias"
        subTitle="Gerencie suas categorias"
        rightContent={
          <Button
            startIcon={<Add />}
            color="primary"
            variant="outlined"
            onClick={openModalCategoria}
          >
            Adicionar Categoria
          </Button>
        }
      />

      <Frame>
        <DataTable
          columns={categoriasColumns}
          data={mountData({
            categorias,
            handleAtivarCategoriaById,
            handleEditarCategoria,
            handleInativarCategoriaById,
          })}
          page={(categorias?.number ?? 0) + 1}
          totalPages={categorias?.totalPages}
          onPageChange={(newPage) => handleChangePage(newPage - 1)}
          textForEmptyData="Nenhuma categoria encontrada."
          toolbar={
            <Filtro
              defaultValue={!categoriaListPayload.ativo}
              filterCount={filterCount}
              applyFilter={handleSubmitFilterForm}
            />
          }
        />
      </Frame>

      {modalCategoriaState.open && (
        <ModalCategoria
          categoria={modalCategoriaState.categoria}
          open={modalCategoriaState.open}
          onClose={closeModalCategoria}
        />
      )}
    </FormProvider>
  );
};
