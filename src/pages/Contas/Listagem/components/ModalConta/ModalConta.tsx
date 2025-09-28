import { Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Switch,
  Grid,
} from "@mui/material";
import { Modal } from "../../../../../components/Modal";
import { useModalConta } from "./hooks/useModalConta";
import { tipoContaOptions } from "../../../../../constants/tipoContaOptions";
import { IContaApi } from "../../../../../api/Contas/interfaces/IContaApi";

interface IModalContaProps {
  conta: IContaApi | undefined;
  open: boolean;
  onClose(): void;
}

export const ModalConta: React.FC<IModalContaProps> = ({
  conta,
  open,
  onClose,
}) => {
  const modalConta = useModalConta({ conta, onClose });

  return (
    <Modal
      open={open}
      style={{ width: "auto", height: "auto", minWidth: 480, maxWidth: 600 }}
      title={`${conta ? "Editar " : "Nova "}Conta`}
      buttons={
        <>
          <Button variant="text" onClick={onClose}>
            Fechar
          </Button>
          <Button variant="contained" onClick={modalConta.submitContaForm}>
            Salvar
          </Button>
        </>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="nome"
            control={modalConta.contaForm.control}
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
            name="tipoConta"
            control={modalConta.contaForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="tipoConta"
                options={tipoContaOptions ?? []}
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
                    label="Tipo de Conta"
                    required
                    error={!!fieldState.error}
                  />
                )}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="agencia"
            rules={{ required: false }}
            control={modalConta.contaForm.control}
            render={({ field, formState }) => (
              <TextField
                {...field}
                label="Agência"
                fullWidth
                onChange={(e) => {
                  const valueSemEspaco = e.target.value
                    .replace(/\s/g, "")
                    .toUpperCase();
                  field.onChange(valueSemEspaco);
                }}
                value={field.value?.toUpperCase() || ""}
                error={!!formState.errors.agencia}
                inputProps={{ maxLength: 10 }}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="conta"
            rules={{ required: false }}
            control={modalConta.contaForm.control}
            render={({ field, formState }) => (
              <TextField
                {...field}
                label="Conta"
                fullWidth
                onChange={(e) => {
                  const valueSemEspaco = e.target.value
                    .replace(/\s/g, "")
                    .toUpperCase();
                  field.onChange(valueSemEspaco);
                }}
                value={field.value?.toUpperCase() || ""}
                error={!!formState.errors.conta}
                inputProps={{ maxLength: 10 }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="observacao"
            rules={{ required: false }}
            control={modalConta.contaForm.control}
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

        <Grid item xs={6}>
          <Controller
            name="incluirEmSomas"
            control={modalConta.contaForm.control}
            defaultValue={true}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Incluir em somas"
                />
              </FormGroup>
            )}
          />
        </Grid>
      </Grid>
    </Modal>
  );
};
