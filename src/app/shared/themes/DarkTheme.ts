import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: "#1B2537",
      dark: "#18202D",
      light: "#283645",
      contrastText: "#D3D3D3",
    },

    secondary: {
      main: "#373B8A",
      dark: "#2C2F6F",
      light: "#6B6FBB",
      contrastText: "#D3D3D3",
    },

    info: {
      main: "#44C89E",
      dark: "#2F9C7E",
      light: "#6CE0B0",
      contrastText: "#1B2537",
    },

    background: {
      paper: "#141A28",
      default: "#18202D",
    },

    text: {
      primary: "#D3D3D3",
      secondary: "#B0B0B0",
      disabled: "#6D6D6D",
    },

    divider: "#283645",
  },

  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: "#D3D3D3",
        },
      },
    },
  },
});
