import { Controller, useFormContext } from "react-hook-form";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Autocomplete,
  TextField,
} from "@mui/material";
import { FilterDrawer } from "../../../../../components/FilterDrawer";
import { CategoriaParamsPaginado } from "@/types";
import { useUrlParams } from "@/hooks/useUrlParams";
import { tipoMovimentacaoOptions } from "@/constants/tipoMovimentacaoOptions";

interface IFiltroProps {
  filterCount: number;
  applyFilter(): void;
}

export const Filtro: React.FC<IFiltroProps> = ({
  filterCount,
  applyFilter,
}) => {
  const filterForm = useFormContext<CategoriaParamsPaginado>();

  const { getParam } = useUrlParams();

  return (
    <FilterDrawer applyFilter={applyFilter} filterCount={filterCount}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="tipoMovimentacao"
            control={filterForm.control}
            render={({ field }) => (
              <Autocomplete
                disablePortal
                id="tipoMovimentacao"
                options={tipoMovimentacaoOptions ?? []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => field.onChange(newValue?.id ?? null)}
                value={
                  tipoMovimentacaoOptions.find((o) => o.id === field.value) ??
                  null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText="Nenhum resultado encontrado."
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Tipo" />
                )}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="ativo"
            control={filterForm.control}
            defaultValue={getParam("ativo", false)}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={field.value} onChange={field.onChange} />
                  }
                  label="Exibir somente inativos"
                />
              </FormGroup>
            )}
          />
        </Grid>
      </Grid>
    </FilterDrawer>
  );
};
