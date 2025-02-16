import { Box, styled } from "@mui/material";

export const BoxContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  width: "50%",
  backgroundColor: theme.palette.primary.main,
}));
