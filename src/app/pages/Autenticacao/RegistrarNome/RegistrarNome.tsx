import { Grid } from "@mui/material";
import { AutenticacaoLayout } from "../../../shared/layouts/AutenticacaoLayout";
import { useRegistrarNome } from "./hooks/useRegistrarNome";
import { Controller } from "react-hook-form";
import { StyledDivider, StyledLink, StyledTextField } from "../styles/style";
import { LargeButton } from "../../../shared/components/LargeButton";

export const RegistrarNome: React.FC = () => {
  const {
    registrarNomeForm,
    isPending,
    handleKeyDown,
    handleNavigate,
    onSubmit,
  } = useRegistrarNome();

  return (
    <AutenticacaoLayout
      titleRoute="Digite o seu nome"
      onKeyDown={handleKeyDown}
    >
      <Grid item xs={12}>
        <Controller
          name="nome"
          control={registrarNomeForm.control}
          rules={{
            required: true,
          }}
          render={({ field, fieldState }) => (
            <StyledTextField
              label="Nome"
              type="text"
              variant="outlined"
              color="secondary"
              onChange={field.onChange}
              value={field.value ?? ""}
              inputProps={{
                maxLength: 50,
              }}
              sx={{
                "& .MuiFormHelperText-root": {
                  textAlign: "right",
                },
              }}
              required
              disabled={isPending}
              fullWidth
              error={!!fieldState.error}
              helperText={`${field.value.length}/50`}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <LargeButton
          onClick={registrarNomeForm.handleSubmit(onSubmit)}
          loading={isPending}
        >
          SALVAR
        </LargeButton>
      </Grid>
      <Grid item xs={12}>
        <StyledDivider />
      </Grid>
      <Grid item>
        <Grid item xs>
          <StyledLink
            onClick={handleNavigate}
            variant="body2"
            sx={{ cursor: "pointer" }}
          >
            Fazer login
          </StyledLink>
        </Grid>
      </Grid>
    </AutenticacaoLayout>
  );
};
