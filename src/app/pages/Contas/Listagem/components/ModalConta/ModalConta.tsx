import {
  Autocomplete,
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import { Modal } from "../../../../../shared/components/Modal/Modal";
import useModalConta from "./hooks/useModalConta";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import { tipoContas } from "../../../../../shared/constants/tipoContas";

export const ModalConta: React.FC = () => {
  const { contaForm, conta, openModalConta, onSubmit, toggleModalConta } =
    useModalConta();

  const { t } = useTranslation();

  return (
    <Modal
      open={openModalConta}
      title={
        !conta?.id
          ? t("PAGES.CONTAS.MODALS.MODAL_CREATE.ADD")
          : t("PAGES.CONTAS.MODALS.MODAL_CREATE.EDIT")
      }
      style={{ width: "600px" }}
      buttons={
        <>
          <Button variant="text" onClick={toggleModalConta}>
            {t("BUTTONS.CLOSE")}
          </Button>
          <Button
            variant="contained"
            onClick={contaForm.handleSubmit(onSubmit)}
          >
            {t("BUTTONS.SAVE")}
          </Button>
        </>
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="nome"
            control={contaForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <TextField
                label="Nome"
                type="text"
                color="secondary"
                variant="standard"
                onChange={field.onChange}
                value={field.value ?? ""}
                inputProps={{
                  maxLength: 30,
                }}
                required
                error={!!fieldState.error}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="tipoConta"
            control={contaForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="tipo"
                color="secondary"
                options={tipoContas || []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  field.onChange(newValue?.id);
                }}
                value={tipoContas?.find((c) => c.id === field.value) || null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    color="secondary"
                    variant="standard"
                    label="Tipo da Conta"
                    error={!!fieldState.error}
                    required
                  />
                )}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            name="agencia"
            control={contaForm.control}
            rules={{ required: false }}
            render={({ field, fieldState }) => (
              <TextField
                label="Agência"
                name="agencia"
                type="text"
                variant="standard"
                color="secondary"
                onChange={field.onChange}
                value={field.value ?? ""}
                inputProps={{
                  maxLength: 30,
                }}
                fullWidth
                error={!!fieldState.error}
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            name="conta"
            control={contaForm.control}
            rules={{ required: false }}
            render={({ field, fieldState }) => (
              <TextField
                label="Conta"
                name="conta"
                type="text"
                variant="standard"
                color="secondary"
                onChange={field.onChange}
                value={field.value ?? ""}
                inputProps={{
                  maxLength: 30,
                }}
                fullWidth
                error={!!fieldState.error}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="observacao"
            control={contaForm.control}
            rules={{ required: false }}
            render={({ field, fieldState }) => (
              <TextField
                label="Observação"
                type="text"
                color="secondary"
                variant="standard"
                onChange={field.onChange}
                value={field.value ?? ""}
                inputProps={{
                  maxLength: 30,
                }}
                error={!!fieldState.error}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="incluirSoma"
            control={contaForm.control}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={field.value ?? true}
                      onChange={field.onChange}
                      size="small"
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
