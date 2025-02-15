import { styled, Box } from "@mui/material";

export const BoxContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "#EEEEEE",
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  paddingTop: theme.spacing(3),
  width: "95%",
  margin: "0 auto",
  overflowY: "auto",
}));
