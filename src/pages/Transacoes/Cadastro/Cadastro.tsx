import { PageHeader } from "@/components/PageHeader";
import {
  Autocomplete,
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useCadastro } from "./hooks/useCadastro";
import { tipoMovimentacaoOptions } from "@/constants/tipoMovimentacaoOptions";
import { NumericFormat } from "react-number-format";
import { getSituacaoTransacao } from "@/utils/getSituacaoTransacao";

export const Cadastro: React.FC = () => {
  const cadastro = useCadastro();

  return (
    <>
      <PageHeader
        title={cadastro.pageTitle}
        breadcrumbs={cadastro.breadcrumbs}
        rightContent={
          <>
            <Button variant="text" onClick={cadastro.handleBack}>
              Voltar
            </Button>
            {!cadastro.isDisabledForm && (
              <Button variant="outlined" onClick={cadastro.submitTransacaoForm}>
                Salvar
              </Button>
            )}
          </>
        }
      />

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Controller
            name="tipoMovimentacao"
            control={cadastro.transacaoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="tipoMovimentacao"
                options={tipoMovimentacaoOptions ?? []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  field.onChange(newValue?.id ?? null);
                  if (cadastro.transacaoForm.getValues("categoria")?.id) {
                    cadastro.transacaoForm.setValue("categoria", null);
                  }
                }}
                value={
                  tipoMovimentacaoOptions.find((o) => o.id === field.value) ??
                  null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText="Nenhum resultado encontrado."
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tipo"
                    required
                    disabled={cadastro.isDisabledForm}
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
            name="data"
            control={cadastro.transacaoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Data"
                type="date"
                fullWidth
                required
                error={!!fieldState.error}
                disabled={cadastro.isDisabledForm}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="valor"
            control={cadastro.transacaoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <NumericFormat
                customInput={TextField}
                label="Valor"
                fullWidth
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                value={field.value ?? ""}
                onValueChange={(values) => {
                  field.onChange(values.floatValue ?? 0);
                }}
                disabled={cadastro.isDisabledForm}
                error={!!fieldState.error}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="categoria"
            control={cadastro.transacaoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="tipo"
                options={cadastro.categorias ?? []}
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
                    label="Categoria"
                    required
                    disabled={cadastro.isDisabledForm}
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
            name="conta"
            control={cadastro.transacaoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="tipo"
                options={cadastro.contas ?? []}
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
                    label="Conta"
                    required
                    disabled={cadastro.isDisabledForm}
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
            control={cadastro.transacaoForm.control}
            render={({ field, formState }) => (
              <TextField
                {...field}
                label="Observação"
                fullWidth
                multiline
                value={field.value ?? ""}
                rows={2}
                error={!!formState.errors.observacao}
                disabled={cadastro.isDisabledForm}
                inputProps={{ maxLength: 100 }}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="pago"
            control={cadastro.transacaoForm.control}
            defaultValue={true}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      disabled={cadastro.isDisabledForm}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label={getSituacaoTransacao(
                    cadastro.transacaoForm.watch("tipoMovimentacao"),
                    cadastro.transacaoForm.watch("pago")
                  )}
                />
              </FormGroup>
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};
