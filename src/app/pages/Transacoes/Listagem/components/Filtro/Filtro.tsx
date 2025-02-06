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
import { tiposTransacoes } from "../../../../../shared/constants/tiposTransacoes";

export const Filtro: React.FC = () => {
  const { filtroForm, openFiltro, handleSubmit, toggleFiltro } = useFiltro();

  return (
    <Drawer
      open={openFiltro}
      applyFilter={filtroForm.handleSubmit(handleSubmit)}
      closeFilter={toggleFiltro}
    >
      <Box>
        <Controller
          name="tipo"
          control={filtroForm.control}
          rules={{ required: false }}
          render={({ field, fieldState }) => (
            <Autocomplete
              multiple
              disablePortal
              id="tipo"
              options={tiposTransacoes ?? []}
              getOptionLabel={(option) => option.nome || ""}
              onChange={(_, newValue) => {
                field.onChange(newValue.map((item) => item.id));
              }}
              value={
                tiposTransacoes?.filter((option) =>
                  field.value?.includes(option.id)
                ) || []
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  color="secondary"
                  label="Tipo de Transação"
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
          name="concluido"
          control={filtroForm.control}
          defaultValue={false}
          render={({ field }) => (
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={field.value} onChange={field.onChange} />
                }
                label="Exibir transações pendentes"
              />
            </FormGroup>
          )}
        />
      </Box>
    </Drawer>
  );
};
