import { PageHeader } from "@/components/PageHeader";
import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useCadastro } from "./hooks/useCadastro";
import { tipoMovimentacaoOptions } from "@/constants/tipoMovimentacaoOptions";
import { NumericFormat } from "react-number-format";
import { situacaoOptions } from "@/constants/situacaoOptions";
import { filtrarSituacaoOptions } from "@/utils/filtrarSituacaoOptions";
import { normalizarEspacos } from "@/utils/normalizarEspacos";
import { CategoriaAutocomplete } from "@/components/Inputs/CategoriaAutocomplete";
import { ContaAutocomplete } from "@/components/Inputs/ContaAutocomplete";

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
                  cadastro.handleTipoMovimentacaoChange(newValue?.id ?? null);
                }}
                value={
                  tipoMovimentacaoOptions.find((o) => o.id === field.value) ??
                  null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText="Nenhum resultado encontrado."
                disabled={cadastro.isDisabledForm}
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
                options={
                  filtrarSituacaoOptions(
                    cadastro.transacaoForm.getValues("tipoMovimentacao")
                  ) ?? []
                }
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => field.onChange(newValue?.id ?? null)}
                value={
                  situacaoOptions.find((o) => o.id === field.value) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText="Nenhum resultado encontrado."
                disabled={cadastro.isDisabledForm}
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
          <CategoriaAutocomplete
            control={cadastro.transacaoForm.control}
            enabled={cadastro.shouldEnableCadastroQueries}
            name="categoria"
            categoriaParams={{
              ativo: true,
              tipoMovimentacao:
                cadastro.transacaoForm.watch("tipoMovimentacao"),
              padrao: false,
            }}
            disabled={cadastro.isDisabledForm}
          />
        </Grid>

        <Grid item xs={12}>
          <ContaAutocomplete
            control={cadastro.transacaoForm.control}
            enabled={cadastro.shouldEnableCadastroQueries}
            name="conta"
            disabled={cadastro.isDisabledForm}
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
                onBlur={(e) =>
                  field.onChange(normalizarEspacos(e.target.value))
                }
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
          {cadastro.isDisabledForm ? "Voltar" : "Cancelar"}
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
