import { PageHeader } from "@/components/PageHeader";
import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useCadastro } from "./hooks/useCadastro";
import { tipoMovimentacaoOptions } from "@/constants/tipoMovimentacaoOptions";
import { NumericFormat } from "react-number-format";
import { situacaoOptions } from "@/constants/situacaoOptions";

export const Cadastro: React.FC = () => {
  const cadastro = useCadastro();

  return (
    <>
      <PageHeader
        title={cadastro.pageTitle}
        breadcrumbs={cadastro.breadcrumbs}
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

                  if (cadastro.transacaoForm.getValues("situacao")) {
                    cadastro.transacaoForm.setValue("situacao", null);
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
                    size="small"
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
                size="small"
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

        <Grid item xs={6}>
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
                size="small"
                disabled={cadastro.isDisabledForm}
                required
                error={!!fieldState.error}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="situacao"
            control={cadastro.transacaoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="situacao"
                options={situacaoOptions ?? []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => field.onChange(newValue?.id ?? null)}
                value={
                  situacaoOptions.find((o) => o.id === field.value) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText="Nenhum resultado encontrado."
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    label="Situação"
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
                    size="small"
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
                    size="small"
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
                size="small"
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
      </Grid>

      <Box
        mt={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button variant="outlined" onClick={cadastro.handleBack}>
          Voltar
        </Button>

        {!cadastro.isDisabledForm && (
          <Button variant="contained" onClick={cadastro.submitTransacaoForm}>
            Salvar
          </Button>
        )}
      </Box>
    </>
  );
};
