import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00C49A", // verde principal (botões e destaques)
      dark: "#009B79", // verde escuro (hover)
      light: "#4DE8C6", // verde claro (destaques secundários)
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFC658", // amarelo suave (proventos, destaques secundários)
      dark: "#D49A00",
      light: "#FFE296",
      contrastText: "#121212",
    },
    background: {
      default: "#F9F9F9", // fundo principal claro
      paper: "#FFFFFF", // cartões e elementos em destaque
    },
    text: {
      primary: "#121212", // texto principal escuro
      secondary: "#5F6368", // texto secundário
      disabled: "#BDBDBD",
    },
    divider: "#E0E0E0",
  },
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: "#121212", // cor do texto dos labels
        },
      },
    },
  },
});
