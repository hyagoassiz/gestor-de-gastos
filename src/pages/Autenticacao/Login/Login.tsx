import { Checkbox, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useLogin } from "./hooks/useLogin";
import { StyledDivider, StyledFormControlLabel, StyledLink } from "../styles";
import { AuthLayout } from "../../../layouts/AuthLayout";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";

export const Login: React.FC = () => {
  const login = useLogin();

  return (
    <AuthLayout titleRoute="Login" onKeyDown={login.handleKeyDown}>
      <Grid item xs={12}>
        <Controller
          name="email"
          control={login.loginForm.control}
          rules={{
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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
              disabled={login.mutatePostLogin.isPending}
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
              error={!!fieldState.error}
              fullWidth
              disabled={login.mutatePostLogin.isPending}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <StyledFormControlLabel
          control={<Checkbox value="remember" color="secondary" />}
          label="Lembrar de mim"
          disabled={login.mutatePostLogin.isPending}
        />
      </Grid>

      <Grid item xs={12}>
        <LoadingButton
          disabled={login.mutatePostLogin.isPending}
          loading={login.mutatePostLogin.isPending}
          size="large"
          variant="contained"
          onClick={login.submitLoginForm}
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
          <StyledLink
            onClick={login.onCreateAccount}
            variant="body2"
            sx={{ cursor: "pointer" }}
          >
            Não possui conta? Clique aqui
          </StyledLink>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
