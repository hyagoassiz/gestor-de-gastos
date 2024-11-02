import { AppBar as MuiAppBar, Container, Toolbar } from "@mui/material";
import { Title } from "./styles";

export const AppBar: React.FC = () => {
  return (
    <MuiAppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar>
          <Title noWrap>Gestor de Gastos</Title>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
