import { Controller } from "react-hook-form";
import Drawer from "../../../../../shared/components/Drawer/Drawer";
import useFiltro from "./hooks/useFiltro";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";

export const Filtro: React.FC = () => {
  const {
    toggleFiltro,
    handleToggleFiltro,
    filtroForm,
    handleSubmit,
    options,
  } = useFiltro();

  return (
    <Drawer
      open={toggleFiltro}
      applyFilter={filtroForm.handleSubmit(handleSubmit)}
      closeFilter={handleToggleFiltro}
    >
      <Box>
        <Controller
          name="tipo"
          control={filtroForm.control}
          rules={{ required: false }}
          render={({ field, fieldState }) => (
            <Autocomplete
              {...field}
              multiple
              id="tipo"
              color="secondary"
              options={options}
              noOptionsText="Nenhum resultado encontrado."
              onChange={(_, value) => field.onChange(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  color="secondary"
                  sx={{ width: "330px" }}
                  label="Tipo"
                  error={!!fieldState.error}
                />
              )}
            />
          )}
        />
      </Box>

      <Box paddingTop={2}>
        <Controller
          name="situacao"
          control={filtroForm.control}
          defaultValue={false}
          render={({ field }) => (
            <FormGroup>
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Exibir somente inativos"
              />
            </FormGroup>
          )}
        />
      </Box>
    </Drawer>
  );
};
