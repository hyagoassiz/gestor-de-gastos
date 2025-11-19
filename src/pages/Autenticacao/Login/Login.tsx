import { Checkbox, FormControlLabel, Link, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useLogin } from "./hooks/useLogin";
import { StyledDivider } from "../styles";
import { AuthLayout } from "../../../layouts/AuthLayout";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";

export const Login: React.FC = () => {
  const login = useLogin();

  return (
    <AuthLayout titleRoute="Login" onKeyDown={login.handleEnter}>
      <Grid item xs={12}>
        <Controller
          name="email"
          control={login.loginForm.control}
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
          control={login.loginForm.control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              color="secondary"
              onChange={field.onChange}
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
          name="lembrarEmail"
          control={login.loginForm.control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  checked={field.value ?? false}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label="Lembrar de mim"
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <LoadingButton
          disabled={login.isPending}
          loading={login.isPending}
          size="large"
          variant="contained"
          onClick={login.handleLogin}
          sx={{ width: "100%" }}
        >
          Entrar
        </LoadingButton>
      </Grid>

      <Grid item xs={12}>
        <StyledDivider />
      </Grid>

      <Grid item>
        <Grid item xs>
          <Link
            onClick={login.handleCriarConta}
            variant="body2"
            sx={{ cursor: "pointer" }}
          >
            Não possui conta? Clique aqui
          </Link>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
