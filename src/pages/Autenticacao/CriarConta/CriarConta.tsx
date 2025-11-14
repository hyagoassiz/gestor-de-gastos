import { Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useCriarConta } from "./hooks/useCriarConta";
import { StyledDivider, StyledLink } from "../styles";
import { AuthLayout } from "../../../layouts/AuthLayout";
import { LoadingButton } from "@mui/lab";
import { normalizarEspacos } from "@/utils/normalizarEspacos";

export const CriarConta: React.FC = () => {
  const criarConta = useCriarConta();

  return (
    <AuthLayout titleRoute="Criar Conta" onKeyDown={criarConta.handleKeyDown}>
      <Grid item xs={12}>
        <Controller
          name="nome"
          control={criarConta.createAccountForm.control}
          rules={{
            required: true,
          }}
          render={({ field, fieldState }) => (
            <TextField
              label="Nome"
              variant="outlined"
              color="secondary"
              onChange={field.onChange}
              value={field.value ?? ""}
              inputProps={{
                maxLength: 50,
              }}
              required
              disabled={criarConta.isLoading}
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              onBlur={(e) => field.onChange(normalizarEspacos(e.target.value))}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="email"
          control={criarConta.createAccountForm.control}
          rules={{
            required: true,
          }}
          render={({ field, fieldState }) => (
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              color="secondary"
              onChange={field.onChange}
              value={field.value ?? ""}
              inputProps={{
                maxLength: 50,
              }}
              required
              disabled={criarConta.isLoading}
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="senha"
          control={criarConta.createAccountForm.control}
          rules={{ required: true, minLength: 6 }}
          render={({ field, fieldState }) => (
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              color="secondary"
              onChange={(e) => {
                const cleanedValue = e.target.value.replace(/\s+/g, "");
                field.onChange({
                  target: { name: field.name, value: cleanedValue },
                });
              }}
              value={field.value ?? ""}
              inputProps={{
                maxLength: 30,
              }}
              required
              disabled={criarConta.isLoading}
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="confirmarSenha"
          control={criarConta.createAccountForm.control}
          rules={{ required: true, minLength: 6 }}
          render={({ field, fieldState }) => (
            <TextField
              label="Confirmar senha"
              type="password"
              variant="outlined"
              color="secondary"
              onChange={(e) => {
                const cleanedValue = e.target.value.replace(/\s+/g, "");
                field.onChange({
                  target: { name: field.name, value: cleanedValue },
                });
              }}
              value={field.value ?? ""}
              inputProps={{
                maxLength: 30,
              }}
              required
              disabled={criarConta.isLoading}
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <LoadingButton
          loading={criarConta.isLoading}
          variant="contained"
          size="large"
          sx={{ width: "100%" }}
          onClick={criarConta.submitCreateAccountForm}
        >
          CRIAR CONTA
        </LoadingButton>
      </Grid>
      <Grid item xs={12}>
        <StyledDivider />
      </Grid>
      <Grid item>
        <Grid item xs>
          <StyledLink
            onClick={criarConta.navigateToLogin}
            variant="body2"
            sx={{ cursor: "pointer" }}
          >
            Já possui conta? Clique aqui
          </StyledLink>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
