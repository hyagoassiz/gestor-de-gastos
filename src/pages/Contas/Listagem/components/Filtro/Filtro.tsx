import { Controller } from "react-hook-form";
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
import { tipoContaOptions } from "@/constants/tipoContaOptions";
import useFiltro from "./hooks/useFiltro";

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
            name="tipoConta"
            control={filtro.filtroForm.control}
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
            control={filtro.filtroForm.control}
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
                <MenuItem>Todos</MenuItem>
                <MenuItem value="true">Sim</MenuItem>
                <MenuItem value="false">Não</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="ativo"
            control={filtro.filtroForm.control}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={field.value} onChange={field.onChange} />
                  }
                  label="Exibir somente contas inativas"
                />
              </FormGroup>
            )}
          />
        </Grid>
      </Grid>
    </FilterDrawer>
  );
};
