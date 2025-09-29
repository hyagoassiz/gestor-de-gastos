import { Button } from "@mui/material";
import { Frame } from "../../../components/Frame";
import { Add } from "@mui/icons-material";
import { useListagem } from "./hooks/useListagem";
import { DataTable } from "../../../components/DataTable/DataTable";
import { categoriasColumns } from "./constants/constants";
import { mountData } from "./utils/mountData";
import ToolbarContainer from "../../../components/ToolbarContainer/ToolbarContainer";
import Header from "../../../components/Header/Header";
import { FormProvider } from "react-hook-form";
import { Filtro } from "./components/Filtro";
import { ModalCategoria } from "./components/ModalCategoria";

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
      <Header
        title="Categorias"
        buttons={
          <Filtro
            defaultValue={!categoriaListPayload.ativo}
            filterCount={filterCount}
            applyFilter={handleSubmitFilterForm}
          />
        }
      />

      <Frame>
        <ToolbarContainer
          title={`Registros (${categorias?.numberOfElements ?? 0})`}
          showTitleDivider
          showDividers
          buttons={
            <>
              <Button
                startIcon={<Add />}
                color="primary"
                variant="outlined"
                onClick={openModalCategoria}
              >
                NOVA
              </Button>
            </>
          }
        />

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
