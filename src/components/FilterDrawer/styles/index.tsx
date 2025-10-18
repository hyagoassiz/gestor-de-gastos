import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const StyledBox = styled(Box)(({ theme }) => ({
  width: theme.spacing(45),
}));

export const BoxChildren = styled(Box)(() => ({
  margin: "24px 16px",
}));
