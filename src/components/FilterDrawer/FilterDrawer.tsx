import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Drawer as MuiDrawer,
  Tooltip,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { ReactNode, useState } from "react";
import { BoxChildren, StyledBox } from "./styles";

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
            <FilterListIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <MuiDrawer open={open} anchor="right" onClose={handleClose}>
        <StyledBox>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding="8px 16px"
          >
            <Button variant="outlined" onClick={handleClose}>
              Fechar
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                applyFilter();
                handleClose();
              }}
            >
              Filtrar
            </Button>
          </Box>

          <Divider />

          <BoxChildren>{children}</BoxChildren>
        </StyledBox>
      </MuiDrawer>
    </>
  );
};
