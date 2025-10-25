import {
  Divider,
  FormControlLabel,
  Link,
  styled,
  TextField,
  Typography,
} from "@mui/material";

export const StyledTextField = styled(TextField)(() => ({}));

export const StyledLink = styled(Link)(() => ({}));

export const StyledFormControlLabel = styled(FormControlLabel)(() => ({}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledDivider = styled(Divider)(() => ({
  width: "100%",
  height: "1px",
  marginTop: "20px",
}));
