import {
  Autocomplete,
  Button,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
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
import { FilterDrawer } from "../../../components/FilterDrawer";
import { Controller } from "react-hook-form";

export const Listagem: React.FC = () => {
  const {
    ativos,
    operacoes,
    operacaoModalState,
    filterForm,
    filterCount,
    closeOperacaoModal,
    handleEditarOperacao,
    handleDuplicarOperacao,
    handleSubmitFilterForm,
    openOperacaoModal,
  } = useListagem();

  const { fileInputRef, handleFileChange, handleImportClick } =
    usePostOperacaoEmLote();

  return (
    <>
      <Header
        title="Operações"
        buttons={
          <FilterDrawer
            applyFilter={handleSubmitFilterForm}
            filterCount={filterCount}
          >
            <Controller
              name="ativos"
              control={filterForm.control}
              rules={{ required: false }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  multiple
                  disablePortal
                  id="ativo"
                  options={ativos ?? []}
                  getOptionLabel={(option) => option.sigla || ""}
                  filterOptions={(options, { inputValue }) =>
                    options.filter((option) => {
                      const search = inputValue.toLowerCase();
                      return (
                        option.sigla?.toLowerCase().includes(search) ||
                        option.nome?.toLowerCase().includes(search)
                      );
                    })
                  }
                  onChange={(_, newValue) => {
                    field.onChange(newValue);
                  }}
                  value={field.value ?? []}
                  isOptionEqualToValue={(option, value) =>
                    option?.id === value.id
                  }
                  noOptionsText="Nenhum resultado encontrado."
                  renderOption={(props, option) => (
                    <ListItem {...props} key={option.id}>
                      <ListItemText
                        primary={option.sigla}
                        secondary={option.nome}
                        secondaryTypographyProps={{ fontSize: "12px" }}
                      />
                    </ListItem>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Ativos"
                      fullWidth
                      error={!!fieldState.error}
                    />
                  )}
                />
              )}
            />
          </FilterDrawer>
        }
      />

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
                disabled
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
