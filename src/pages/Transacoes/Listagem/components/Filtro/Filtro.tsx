import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import { FilterDrawer } from "../../../../../components/FilterDrawer";
import { TransacaoParamsPaginado } from "@/types";
import { tipoMovimentacaoOptions } from "@/constants/tipoMovimentacaoOptions";

interface IFiltroProps {
  filterCount: number;
  applyFilter(): void;
}

export const Filtro: React.FC<IFiltroProps> = ({
  filterCount,
  applyFilter,
}) => {
  const filterForm = useFormContext<TransacaoParamsPaginado>();

  return (
    <FilterDrawer applyFilter={applyFilter} filterCount={filterCount}>
      <Controller
        name="tipoMovimentacao"
        control={filterForm.control}
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
