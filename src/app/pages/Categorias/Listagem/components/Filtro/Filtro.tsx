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
          name="entrada"
          control={filtroForm.control}
          rules={{ required: false }}
          render={({ field, fieldState }) => (
            <Autocomplete
              multiple
              disablePortal
              id="entrada"
              options={options ?? []}
              getOptionLabel={(option) => option.nome || ""}
              onChange={(_, newValue) => {
                field.onChange(newValue.map((item) => item.id));
              }}
              value={
                options?.filter((option) => field.value?.includes(option.id)) ||
                []
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  color="secondary"
                  label="Tipo"
                  error={!!fieldState.error}
                />
              )}
              fullWidth
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
