import { Box, Grid } from "@mui/material";
import { useVerificacao } from "./hooks/useVerificacao";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { StyledDivider, StyledLink, StyledTypography } from "../styles/style";
import { AutenticacaoLayout } from "../../../shared/layouts/AutenticacaoLayout";

export const Verificacao: React.FC = () => {
  const { handleNavigate, userReducer } = useVerificacao();

  return (
    <AutenticacaoLayout titleRoute="E-mail de verificação enviado">
      <Grid item xs={12}>
        <Box textAlign="justify">
          <StyledTypography>
            {`Para continuar, confirme que tem acesso ao email: `}
            <StyledTypography fontWeight="bold">
              {userReducer?.email}
            </StyledTypography>
          </StyledTypography>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "20px",
            }}
          >
            <MarkEmailReadIcon color="success" sx={{ fontSize: "70px" }} />
          </Grid>
          <StyledTypography>
            {`Foi enviado um email para fazer a verificação do seu usuário. Se não encontrar na caixa de entrada, procure também na sua caixa de Spam.`}
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
            Já possui conta? Clique aqui
          </StyledLink>
        </Grid>
      </Grid>
    </AutenticacaoLayout>
  );
};
