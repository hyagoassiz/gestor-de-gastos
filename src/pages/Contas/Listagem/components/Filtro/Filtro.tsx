import { Controller, useFormContext } from "react-hook-form";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Autocomplete,
  Grid,
  MenuItem,
} from "@mui/material";
import { FilterDrawer } from "../../../../../components/FilterDrawer";
import { ContaParams } from "@/types";
import { tipoContaOptions } from "@/constants/tipoContaOptions";
import { useUrlParams } from "@/hooks/useUrlParams";

interface IFiltroProps {
  filterCount: number;
  applyFilter(): void;
}

export const Filtro: React.FC<IFiltroProps> = ({
  filterCount,
  applyFilter,
}) => {
  const filterForm = useFormContext<ContaParams>();

  const { getParam } = useUrlParams();

  return (
    <FilterDrawer applyFilter={applyFilter} filterCount={filterCount}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="tipoConta"
            control={filterForm.control}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="tipoConta"
                options={tipoContaOptions ?? []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => field.onChange(newValue?.id ?? null)}
                value={
                  tipoContaOptions.find((o) => o.id === field.value) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText="Nenhum resultado encontrado."
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    label="Tipo de Conta"
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
            name="incluirEmSomas"
            control={filterForm.control}
            defaultValue={null}
            render={({ field }) => (
              <TextField
                select
                size="small"
                label="Incluir em somas"
                value={field.value}
                onChange={(e) => {
                  const val = e.target.value;
                  field.onChange(
                    val === "true" ? true : val === "false" ? false : null
                  );
                }}
                fullWidth
              >
                <MenuItem value={null}>Todos</MenuItem>
                <MenuItem value="true">Sim</MenuItem>
                <MenuItem value="false">Não</MenuItem>
              </TextField>
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
