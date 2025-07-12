import {
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Frame } from "../../../components/Frame";
import { Header } from "../../../components/Header";
import { ToolbarContainer } from "../../../components/ToolbarContainer";
import { Add } from "@mui/icons-material";
import { ModalAtivo } from "./components/ModalAtivo";
import { useList } from "./hooks/useList";
import { DataTable } from "../../../components/DataTable/DataTable";
import { ativosColumns } from "./constants/constants";
import { mountData } from "./utils/mountData";
import { ModalInativar } from "./components/ModalInativar";
import { FilterDrawer } from "../../../components/FilterDrawer";
import { Controller } from "react-hook-form";

export const Listagem: React.FC = () => {
  const {
    ativos,
    modalAtivoState,
    modalInativarState,
    filterForm,
    filterCount,
    closeModalAtivo,
    closeModalInativar,
    handleAtivarAtivo,
    handleEditarAtivo,
    handleInativarAtivo,
    handleSubmitFilterForm,
    openModalAtivo,
    setAtivoListPayload,
  } = useList();

  return (
    <>
      <Header
        title="Ativos"
        buttons={
          <FilterDrawer
            applyFilter={handleSubmitFilterForm}
            filterCount={filterCount}
          >
            <Controller
              name="ativo"
              control={filterForm.control}
              defaultValue={false}
              render={({ field }) => (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="info"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    }
                    label="Exibir somente inativos"
                  />
                </FormGroup>
              )}
            />
          </FilterDrawer>
        }
      />

      <Frame>
        <ToolbarContainer
          title={`Ativos`}
          showTitleDivider
          showDividers
          buttons={
            <>
              <Button
                startIcon={<Add />}
                color="primary"
                variant="outlined"
                onClick={openModalAtivo}
              >
                Novo
              </Button>
            </>
          }
        />

        <DataTable
          chips={
            filterCount > 0 && (
              <Chip
                label="Inativos"
                onDelete={() => setAtivoListPayload({ ativo: true })}
              />
            )
          }
          columns={ativosColumns}
          data={mountData({
            ativos,
            handleAtivarAtivo,
            handleEditarAtivo,
            handleInativarAtivo,
          })}
          textForEmptyData="Nenhum ativo encontrado."
        />
      </Frame>

      {modalAtivoState.open && (
        <ModalAtivo
          ativo={modalAtivoState.ativo}
          open={modalAtivoState.open}
          onClose={closeModalAtivo}
        />
      )}

      {modalInativarState.open && (
        <ModalInativar
          open={modalInativarState.open}
          ativo={modalInativarState.ativo}
          onClose={closeModalInativar}
        />
      )}
    </>
  );
};
