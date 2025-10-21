import { Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import { FilterDrawer } from "../../../../../components/FilterDrawer";
import { tipoMovimentacaoOptions } from "@/constants/tipoMovimentacaoOptions";
import useFiltro from "./hooks/useFiltro";

interface IFiltroProps {
  filterCount: number;
}

export const Filtro: React.FC<IFiltroProps> = ({ filterCount }) => {
  const { filtroForm, handleSubmitFiltroForm } = useFiltro();

  return (
    <FilterDrawer
      applyFilter={handleSubmitFiltroForm}
      filterCount={filterCount}
    >
      <Controller
        name="tipoMovimentacao"
        control={filtroForm.control}
        rules={{ required: false }}
        render={({ field, fieldState }) => (
          <Autocomplete
            disablePortal
            id="tipoMovimentacao"
            options={tipoMovimentacaoOptions ?? []}
            getOptionLabel={(option) => option.nome || ""}
            onChange={(_, newValue) => {
              field.onChange(newValue?.id ?? null);
            }}
            value={
              tipoMovimentacaoOptions.find((o) => o.id === field.value) ?? null
            }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            noOptionsText="Nenhum resultado encontrado."
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Tipo de Transação"
                error={!!fieldState.error}
              />
            )}
            fullWidth
          />
        )}
      />
    </FilterDrawer>
  );
};
