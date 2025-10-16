import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const StyledBox = styled(Box)(({ theme }) => ({
  width: theme.spacing(45),
}));

export const BoxChildren = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2),
}));
