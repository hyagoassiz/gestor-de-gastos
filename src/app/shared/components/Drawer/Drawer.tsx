import {
  Button,
  Drawer as MuiDrawer,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ReactNode } from "react";
import {
  BackIcon,
  BoxApply,
  BoxButtons,
  BoxChildren,
  HeaderBox,
  StyledBox,
  StyledTypography,
} from "./styles";

interface IDrawer {
  open: boolean;
  children: ReactNode;
  closeFilter: () => void;
  applyFilter: () => void;
}

const Drawer = ({ open, children, closeFilter, applyFilter }: IDrawer) => {
  return (
    <MuiDrawer open={open} anchor="right">
      <StyledBox>
        <HeaderBox>
          <BoxButtons>
            <Tooltip title="Voltar" placement="bottom">
              <IconButton onClick={closeFilter}>
                <BackIcon />
              </IconButton>
            </Tooltip>
            <StyledTypography variant="h6">Filtrar</StyledTypography>
            <BoxApply>
              <Button
                color="secondary"
                variant="contained"
                onClick={applyFilter}
              >
                Aplicar
              </Button>
            </BoxApply>
          </BoxButtons>
        </HeaderBox>
        <BoxChildren>{children}</BoxChildren>
      </StyledBox>
    </MuiDrawer>
  );
};

export default Drawer;
