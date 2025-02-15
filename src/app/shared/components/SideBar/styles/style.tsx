import { Box, styled, Typography } from "@mui/material";

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.spacing(1.4),
  fontWeight: 500,
}));

export const BoxContainer = styled(Box)(({ theme }) => ({
  width: theme.spacing(28),
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.palette.primary.main,
}));
