import { PageHeader } from "@/components/PageHeader";
import { tipoContaOptions } from "@/constants/tipoContaOptions";
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
              <Button variant="outlined" onClick={cadastro.submitContaForm}>
                Salvar
              </Button>
            )}
          </>
        }
      />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="nome"
            rules={{ required: true }}
            control={cadastro.contaForm.control}
            render={({ field, formState }) => (
              <TextField
                {...field}
                label="Nome"
                fullWidth
                value={field.value ?? ""}
                required
                inputProps={{ maxLength: 100 }}
                disabled={cadastro.isDisabledForm}
                error={!!formState.errors.nome}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="tipoConta"
            control={cadastro.contaForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="tipoConta"
                options={tipoContaOptions ?? []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => field.onChange(newValue?.id ?? null)}
                value={
                  tipoContaOptions.find((o) => o.id === field.value) ?? null
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
            name="agencia"
            rules={{ required: false }}
            control={cadastro.contaForm.control}
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
                disabled={cadastro.isDisabledForm}
                inputProps={{ maxLength: 10 }}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="conta"
            rules={{ required: false }}
            control={cadastro.contaForm.control}
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
                disabled={cadastro.isDisabledForm}
                inputProps={{ maxLength: 10 }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="observacao"
            rules={{ required: false }}
            control={cadastro.contaForm.control}
            render={({ field, formState }) => (
              <TextField
                {...field}
                label="Observação"
                fullWidth
                multiline
                rows={2}
                value={field.value ?? ""}
                error={!!formState.errors.observacao}
                disabled={cadastro.isDisabledForm}
                inputProps={{ maxLength: 100 }}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="incluirEmSomas"
            control={cadastro.contaForm.control}
            defaultValue={true}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      disabled
                    />
                  }
                  label="Incluir em somas"
                />
              </FormGroup>
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};
