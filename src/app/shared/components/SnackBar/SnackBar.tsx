import { Alert, Snackbar as MuiSnackBar } from "@mui/material";
import useSnackBar from "./hooks/useSnackBar";

const SnackBar: React.FC = () => {
  const { snackBar, handleClose } = useSnackBar();

  return (
    <>
      <MuiSnackBar
        open={snackBar.open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ marginTop: "55px" }}
      >
        <Alert
          severity={`${snackBar.type}`}
          variant="filled"
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          {snackBar.message}
        </Alert>
      </MuiSnackBar>
    </>
  );
};

export default SnackBar;
