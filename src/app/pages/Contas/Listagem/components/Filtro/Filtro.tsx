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
import { tipoContas } from "../../../../../shared/constants/tipoContas";

export const Filtro: React.FC = () => {
  const { toggleFiltro, handleToggleFiltro, filtroForm, handleSubmit } =
    useFiltro();

  return (
    <Drawer
      open={toggleFiltro}
      applyFilter={filtroForm.handleSubmit(handleSubmit)}
      closeFilter={handleToggleFiltro}
    >
      <Box>
        <Controller
          name="tipoConta"
          control={filtroForm.control}
          rules={{ required: false }}
          render={({ field, fieldState }) => (
            <Autocomplete
              multiple
              disablePortal
              id="tipoConta"
              options={tipoContas ?? []}
              getOptionLabel={(option) => option.nome || ""}
              onChange={(_, newValue) => {
                field.onChange(newValue.map((item) => item.id));
              }}
              value={
                tipoContas?.filter((option) =>
                  field.value?.includes(option.id)
                ) || []
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  color="secondary"
                  label="Tipo de Conta"
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
          name="ativo"
          control={filtroForm.control}
          defaultValue={false}
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
      </Box>
    </Drawer>
  );
};
