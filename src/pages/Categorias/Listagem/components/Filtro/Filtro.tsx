import { Controller } from "react-hook-form";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Autocomplete,
  TextField,
} from "@mui/material";
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="tipoMovimentacao"
            control={filtroForm.control}
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
            control={filtroForm.control}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={field.value} onChange={field.onChange} />
                  }
                  label="Exibir somente categorias inativas"
                />
              </FormGroup>
            )}
          />
        </Grid>
      </Grid>
    </FilterDrawer>
  );
};
