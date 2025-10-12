import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRoutes } from "./routes";
import { darkTheme, lightTheme } from "./themes";
import { SnackBar } from "./components/SnackBar";
import { useGlobalTheme } from "./hooks/useGlobalTheme";

function App() {
  const queryClient = new QueryClient();

  const { darkMode } = useGlobalTheme();

  console.log(darkMode);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </ThemeProvider>
      <SnackBar />
    </>
  );
}

export default App;
