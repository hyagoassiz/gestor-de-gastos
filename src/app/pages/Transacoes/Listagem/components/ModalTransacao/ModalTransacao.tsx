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
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import useModalTransacao from "./hooks/useModalTransacao";
import { tipoCategorias } from "../../../../../shared/constants/tipoCategorias";
import { NumericFormat } from "react-number-format";

export const ModalTransacao: React.FC = () => {
  const {
    toggleModalTransacao,
    handleToggleModalTransacao,
    transacaoForm,
    onSubmit,
    transacao,
    categorias,
    contas,
  } = useModalTransacao();

  const { t } = useTranslation();

  return (
    <Modal
      open={toggleModalTransacao}
      title={
        !transacao?.id
          ? t("PAGES.CONTAS.MODALS.MODAL_CREATE.ADD")
          : t("PAGES.CONTAS.MODALS.MODAL_CREATE.EDIT")
      }
      style={{ width: "600px" }}
      buttons={
        <>
          <Button variant="text" onClick={handleToggleModalTransacao}>
            {t("BUTTONS.CLOSE")}
          </Button>
          <Button
            variant="contained"
            onClick={transacaoForm.handleSubmit(onSubmit)}
          >
            {t("BUTTONS.SAVE")}
          </Button>
        </>
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Controller
            name="tipo"
            control={transacaoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="tipo"
                color="secondary"
                options={tipoCategorias || []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  field.onChange(newValue?.id);
                }}
                value={
                  tipoCategorias?.find((c) => c.id === field.value) || null
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    color="secondary"
                    variant="standard"
                    label="Tipo"
                    error={!!fieldState.error}
                    required
                  />
                )}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="data"
            control={transacaoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <TextField
                label="Data"
                type="date"
                variant="standard"
                color="secondary"
                onChange={field.onChange}
                value={field.value ?? ""}
                inputProps={{
                  maxLength: 30,
                }}
                required
                error={!!fieldState.error}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="valor"
            control={transacaoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <NumericFormat
                label="Valor"
                margin="none"
                variant="standard"
                customInput={TextField}
                prefix={"R$ "}
                fullWidth
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                decimalScale={2}
                fixedDecimalScale={true}
                value={field.value ?? null}
                onValueChange={(values) => {
                  field.onChange(values.floatValue ?? 0);
                }}
                decimalSeparator=","
                thousandSeparator={"."}
                defaultValue={0}
                required
                color="secondary"
                error={!!fieldState.error}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="idCategoria"
            control={transacaoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="idCategoria"
                options={categorias ?? []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  field.onChange(newValue ? newValue.id : null);
                }}
                value={categorias?.find((c) => c.id === field.value) || null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    color="secondary"
                    label="Categoria"
                    error={!!fieldState.error}
                    required
                  />
                )}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="idConta"
            control={transacaoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="idConta"
                options={contas ?? []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  field.onChange(newValue ? newValue.id : null);
                }}
                value={contas?.find((c) => c.id === field.value) || null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    color="secondary"
                    label="Conta"
                    error={!!fieldState.error}
                    required
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
            control={transacaoForm.control}
            rules={{ required: false }}
            render={({ field, fieldState }) => (
              <TextField
                label="Observação"
                name="observacao"
                type="text"
                variant="standard"
                color="secondary"
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
            name="concluido"
            control={transacaoForm.control}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={field.value ?? true}
                      onChange={field.onChange}
                      size="medium"
                    />
                  }
                  label="Pago"
                />
              </FormGroup>
            )}
          />
        </Grid>
      </Grid>
    </Modal>
  );
};
