import { PageHeader } from "@/components/PageHeader";
import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useCadastro } from "./hooks/useCadastro";
import { tipoMovimentacaoOptions } from "@/constants/tipoMovimentacaoOptions";

export const Cadastro: React.FC = () => {
  const cadastro = useCadastro();

  return (
    <>
      <PageHeader
        title={cadastro.pageTitle}
        breadcrumbs={cadastro.breadcrumbs}
      />

      <Grid container spacing={3}>
        <Grid item xs={7}>
          <Controller
            name="nome"
            control={cadastro.categoriaForm.control}
            rules={{ required: true }}
            render={({ field, formState }) => (
              <TextField
                {...field}
                size="small"
                label="Nome"
                fullWidth
                value={field.value ?? ""}
                required
                disabled={cadastro.isDisabledForm}
                error={!!formState.errors.nome}
                inputProps={{ maxLength: 50 }}
              />
            )}
          />
        </Grid>

        <Grid item xs={5}>
          <Controller
            name="tipoMovimentacao"
            control={cadastro.categoriaForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="tipoMovimentacao"
                options={tipoMovimentacaoOptions ?? []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => field.onChange(newValue?.id ?? null)}
                value={
                  tipoMovimentacaoOptions.find((o) => o.id === field.value) ??
                  null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText="Nenhum resultado encontrado."
                disabled={cadastro.isDisabledForm || cadastro.mode === "edit"}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    label="Tipo"
                    required
                    disabled={
                      cadastro.isDisabledForm || cadastro.mode === "edit"
                    }
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
            control={cadastro.categoriaForm.control}
            render={({ field, formState }) => (
              <TextField
                {...field}
                size="small"
                label="Observação"
                fullWidth
                multiline
                value={field.value ?? ""}
                rows={2}
                disabled={cadastro.isDisabledForm}
                error={!!formState.errors.observacao}
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
          <Button variant="contained" onClick={cadastro.submitCategoriaForm}>
            Salvar
          </Button>
        )}
      </Box>
    </>
  );
};
