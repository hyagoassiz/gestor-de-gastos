import { Controller } from "react-hook-form";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { FilterDrawer } from "../../../../../components/FilterDrawer";
import { tipoMovimentacaoOptions } from "@/constants/tipoMovimentacaoOptions";
import useFiltro from "./hooks/useFiltro";
import { situacaoOptions } from "@/constants/situacaoOptions";

interface FiltroProps {
  filterCount: number;
}

export const Filtro: React.FC<FiltroProps> = ({ filterCount }) => {
  const filtro = useFiltro();

  return (
    <FilterDrawer
      applyFilter={filtro.handleSubmitFiltroForm}
      filterCount={filterCount}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="tipoMovimentacao"
            control={filtro.filtroForm.control}
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
                  tipoMovimentacaoOptions.find((o) => o.id === field.value) ??
                  null
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
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="situacao"
            control={filtro.filtroForm.control}
            rules={{ required: false }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="situacao"
                options={situacaoOptions ?? []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  field.onChange(newValue?.id ?? null);
                }}
                value={
                  situacaoOptions.find((o) => o.id === field.value) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText="Nenhum resultado encontrado."
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    label="Situação"
                    error={!!fieldState.error}
                  />
                )}
                fullWidth
              />
            )}
          />
        </Grid>
      </Grid>
    </FilterDrawer>
  );
};
