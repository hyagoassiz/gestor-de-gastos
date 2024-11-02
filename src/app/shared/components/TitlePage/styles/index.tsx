import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const StyledBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(3),
  fontWeight: 600,
  textTransform: "uppercase",
}));

export const StyledSubTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(2),
  fontWeight: 500,
}));
