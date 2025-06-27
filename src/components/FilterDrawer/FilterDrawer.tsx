import {
  Badge,
  Button,
  IconButton,
  Drawer as MuiDrawer,
  Tooltip,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { ReactNode, useState } from "react";
import {
  Icon,
  BoxApply,
  BoxButtons,
  BoxChildren,
  HeaderBox,
  StyledBox,
  StyledTypography,
} from "./styles";

interface IFilterDrawer {
  children: ReactNode;
  filterCount: number;
  applyFilter: () => void;
}

export const FilterDrawer = ({
  children,
  filterCount,
  applyFilter,
}: IFilterDrawer) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title="Filtrar">
        <IconButton onClick={handleOpen}>
          <Badge badgeContent={filterCount} color="secondary">
            <FilterListIcon sx={{ color: "white" }} />
          </Badge>
        </IconButton>
      </Tooltip>

      <MuiDrawer open={open} anchor="right" onClose={handleClose}>
        <StyledBox>
          <HeaderBox>
            <BoxButtons>
              <Tooltip title="Fechar" placement="bottom">
                <IconButton onClick={handleClose}>
                  <Icon />
                </IconButton>
              </Tooltip>
              <StyledTypography variant="h6">Fechar</StyledTypography>
              <BoxApply>
                <Button
                  color="info"
                  variant="contained"
                  onClick={() => {
                    applyFilter();
                    handleClose();
                  }}
                >
                  Aplicar Filtros
                </Button>
              </BoxApply>
            </BoxButtons>
          </HeaderBox>
          <BoxChildren>{children}</BoxChildren>
        </StyledBox>
      </MuiDrawer>
    </>
  );
};
