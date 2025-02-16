import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { AppRoutes } from "./app/routes";
import "./app/shared/i18n/index";
import SnackBar from "./app/shared/components/SnackBar/SnackBar";
// import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { DarkTheme } from "./app/shared/themes";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <ThemeProvider theme={DarkTheme}>
        {/* <CssBaseline /> */}
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
          <SnackBar />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
