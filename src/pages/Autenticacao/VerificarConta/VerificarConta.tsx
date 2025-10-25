import { Box, Grid, useTheme } from "@mui/material";
import { useVerificarConta } from "./hooks/useVerificarConta";
import EmailIcon from "@mui/icons-material/Email";
import { StyledDivider, StyledLink, StyledTypography } from "../styles";
import { AuthLayout } from "../../../layouts/AuthLayout";
import useUsuario from "@/hooks/useUsuario";

export const VerificarConta: React.FC = () => {
  const { handleNavigate } = useVerificarConta();

  const theme = useTheme();

  const { obterUsuario } = useUsuario();

  return (
    <AuthLayout titleRoute="E-mail de verificação enviado">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginBottom: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            backgroundColor: theme.palette.primary.main,
            borderRadius: "50%",
          }}
        >
          <EmailIcon color="action" sx={{ fontSize: "50px", color: "white" }} />
        </Box>
      </Box>

      <Grid item xs={12}>
        <Box textAlign="justify">
          <StyledTypography>
            Foi enviado um e-mail para <strong>{obterUsuario()?.email}</strong>{" "}
            para que você possa fazer a verificação do seu usuário.
          </StyledTypography>
        </Box>
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
    </AuthLayout>
  );
};
