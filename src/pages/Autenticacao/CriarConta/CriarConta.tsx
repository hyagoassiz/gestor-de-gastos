import { Grid, Link, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useCriarConta } from "./hooks/useCriarConta";
import { StyledDivider } from "../styles";
import { LoadingButton } from "@mui/lab";
import { normalizarEspacos } from "@/utils/normalizarEspacos";
import { AuthLayout } from "@/layouts/AuthLayout";

export const CriarConta: React.FC = () => {
  const criarConta = useCriarConta();

  return (
    <AuthLayout titleRoute="Criar Conta" onKeyDown={criarConta.handleEnter}>
      <Grid item xs={12}>
        <Controller
          name="nome"
          control={criarConta.criarContaForm.control}
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
              fullWidth
              helperText={fieldState.error?.message}
              onBlur={(e) => field.onChange(normalizarEspacos(e.target.value))}
              error={!!fieldState.error}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="email"
          control={criarConta.criarContaForm.control}
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
              fullWidth
              helperText={fieldState.error?.message}
              error={!!fieldState.error}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="senha"
          control={criarConta.criarContaForm.control}
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
              fullWidth
              helperText={fieldState.error?.message}
              error={!!fieldState.error}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="confirmarSenha"
          control={criarConta.criarContaForm.control}
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
              fullWidth
              helperText={fieldState.error?.message}
              error={!!fieldState.error}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <LoadingButton
          disabled={criarConta.isPending}
          loading={criarConta.isPending}
          variant="contained"
          size="large"
          sx={{ width: "100%" }}
          onClick={criarConta.handleCriarConta}
        >
          Criar Conta
        </LoadingButton>
      </Grid>

      <Grid item xs={12}>
        <StyledDivider />
      </Grid>

      <Grid item>
        <Grid item xs>
          <Link
            onClick={criarConta.handleLogin}
            variant="body2"
            sx={{ cursor: "pointer" }}
          >
            Já possui conta? Clique aqui
          </Link>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
