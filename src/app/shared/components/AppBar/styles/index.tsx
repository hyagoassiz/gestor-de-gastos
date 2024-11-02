import { styled, Typography } from "@mui/material";

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(2.5),
  fontWeight: 600,
  letterSpacing: theme.spacing(0.2),
}));
