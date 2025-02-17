import { Box, styled } from "@mui/material";

export const BoxContainer = styled(Box)(({ theme }) => ({
  width: "50%",
  height: "auto",
  borderRadius: "4px",
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(2),
}));
