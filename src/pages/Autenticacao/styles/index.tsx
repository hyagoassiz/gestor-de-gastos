import { Divider, styled, Typography } from "@mui/material";

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledDivider = styled(Divider)(() => ({
  width: "100%",
  height: "1px",
  marginTop: "20px",
}));
