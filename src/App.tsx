import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRoutes } from "./routes";
import { Theme } from "./themes";
import { SnackBar } from "./components/SnackBar";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={Theme}>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </ThemeProvider>
      <SnackBar />
    </>
  );
}

export default App;
