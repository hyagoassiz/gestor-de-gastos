import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { AppRoutes } from "./app/routes";
import "./app/shared/i18n/index";
import SnackBar from "./app/shared/components/SnackBar/SnackBar";
// import { CssBaseline } from "@mui/material";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      {/* <CssBaseline /> */}
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <SnackBar />
      </QueryClientProvider>
    </>
  );
}

export default App;
