import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Drawer as MuiDrawer,
  Tooltip,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { ReactNode, useState } from "react";
import { BoxChildren, StyledBox } from "./styles";
import CloseIcon from "@mui/icons-material/Close";

interface FilterDrawerProps {
  children: ReactNode;
  filterCount: number;
  applyFilter: () => void;
}

export const FilterDrawer = ({
  children,
  filterCount,
  applyFilter,
}: FilterDrawerProps) => {
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
        <StyledBox
          width={360}
          display="flex"
          flexDirection="column"
          height="100%"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={2}
            height="64px"
          >
            <Typography fontSize="18px">Filtros</Typography>

            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          <Box flex={1} overflow="auto">
            <BoxChildren>{children}</BoxChildren>
          </Box>

          <Divider />

          <Box padding={2} display="flex" gap={2}>
            <Button fullWidth variant="outlined" onClick={handleClose}>
              Cancelar
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                applyFilter();
                handleClose();
              }}
            >
              Aplicar
            </Button>
          </Box>
        </StyledBox>
      </MuiDrawer>
    </>
  );
};
