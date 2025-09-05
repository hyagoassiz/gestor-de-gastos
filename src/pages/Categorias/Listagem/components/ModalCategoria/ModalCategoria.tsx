import { Controller } from "react-hook-form";
import { TextField, Button, Autocomplete, Grid } from "@mui/material";
import { Modal } from "../../../../../components/Modal";
import { useModalCategoria } from "./hooks/useModalCategoria";
import { tipoCategoriaOptions } from "../../../../../constants/tipoCategoriaOptions";

interface IModalCategoriaProps {
  categoria: ICategoriaApi | undefined;
  open: boolean;
  onClose(): void;
}

export const ModalCategoria: React.FC<IModalCategoriaProps> = ({
  categoria,
  open,
  onClose,
}) => {
  const { contaForm, submitContaForm } = useModalCategoria({
    categoria,
    onClose,
  });

  return (
    <Modal
      open={open}
      style={{ width: "auto", height: "auto", minWidth: 480, maxWidth: 600 }}
      title={`${categoria ? "Editar " : "Nova "}Categoria`}
      buttons={
        <>
          <Button variant="text" onClick={onClose}>
            Fechar
          </Button>
          <Button variant="contained" onClick={submitContaForm}>
            Salvar
          </Button>
        </>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="nome"
            control={contaForm.control}
            rules={{ required: true }}
            render={({ field, formState }) => (
              <TextField
                {...field}
                label="Nome"
                fullWidth
                required
                error={!!formState.errors.nome}
                inputProps={{ maxLength: 50 }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="tipo"
            control={contaForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="tipo"
                options={tipoCategoriaOptions ?? []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  field.onChange(newValue);
                }}
                value={field.value ?? null}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText="Nenhum resultado encontrado."
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tipo"
                    required
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
            name="observacao"
            rules={{ required: false }}
            control={contaForm.control}
            render={({ field, formState }) => (
              <TextField
                {...field}
                label="Observação"
                fullWidth
                multiline
                rows={2}
                error={!!formState.errors.observacao}
                inputProps={{ maxLength: 100 }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Modal>
  );
};
