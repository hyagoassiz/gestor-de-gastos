import {
  Autocomplete,
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  ListItem,
  ListItemText,
  Switch,
  TextField,
} from "@mui/material";
import { Modal } from "../../../../../shared/components/Modal/Modal";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import useModalTransacao from "./hooks/useModalTransacao";
import { tiposTransacoes } from "../../../../../shared/constants/tiposTransacoes";
import { NumericFormat } from "react-number-format";
import { TypeTransacao } from "../../../../../shared/interfaces";

export const ModalTransacao: React.FC = () => {
  const {
    transacaoForm,
    transacao,
    categorias,
    contas,
    openModalTransacao,
    isFetchingCategorias,
    onChangeTipoTransacao,
    onSubmit,
    toggleModalTransacao,
  } = useModalTransacao();

  const { t } = useTranslation();

  return (
    <Modal
      open={openModalTransacao}
      title={`${!transacao?.id ? "Adicionar" : "Editar"} Transação`}
      style={{ width: "600px" }}
      buttons={
        <>
          <Button
            color="info"
            variant="outlined"
            onClick={toggleModalTransacao}
          >
            {t("BUTTONS.CLOSE")}
          </Button>
          <Button
            color="info"
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
                color="info"
                options={tiposTransacoes || []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  onChangeTipoTransacao(newValue?.id as TypeTransacao);
                }}
                value={
                  tiposTransacoes?.find((c) => c.id === field.value) || null
                }
                noOptionsText="Nenhum resultado encontrado."
                renderInput={(params) => (
                  <TextField
                    {...params}
                    color="info"
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
                color="info"
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
            rules={{
              required: true,
              validate: (value) => value > 0,
            }}
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
                color="info"
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
                loading={isFetchingCategorias}
                loadingText="Carregando..."
                value={categorias?.find((c) => c.id === field.value) || null}
                noOptionsText="Nenhum resultado encontrado."
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    color="info"
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
                noOptionsText="Nenhum resultado encontrado."
                renderOption={(props, option) => (
                  <ListItem {...props} key={option.id}>
                    <ListItemText
                      primary={option.nome}
                      secondary={
                        option.agencia && option.conta
                          ? `Agência ${option.agencia} / Conta ${option.conta}`
                          : ""
                      }
                      secondaryTypographyProps={{ fontSize: "12px" }}
                    />
                  </ListItem>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    color="info"
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
                color="info"
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
                      color="info"
                      checked={field.value ?? true}
                      onChange={field.onChange}
                      size="medium"
                    />
                  }
                  disabled={!transacaoForm.getValues("tipo")}
                  label={
                    transacaoForm.getValues("tipo") === "ENTRADA"
                      ? "Recebido"
                      : transacaoForm.getValues("tipo") === "SAIDA"
                      ? "Pago"
                      : ""
                  }
                />
              </FormGroup>
            )}
          />
        </Grid>
      </Grid>
    </Modal>
  );
};
