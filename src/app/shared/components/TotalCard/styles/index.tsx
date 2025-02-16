import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const BoxContainer = styled(Box)(({ theme }) => ({
  width: "25%",
  height: "120px",
  borderRadius: "4px",
  gap: 2,
  backgroundColor: theme.palette.primary.main,
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.info.main,
  width: 34,
  height: 34,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
}));
