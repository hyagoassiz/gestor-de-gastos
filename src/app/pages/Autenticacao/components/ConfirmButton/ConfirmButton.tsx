import { ReactNode } from "react";
import { StyledButton } from "./styles/style";
import { CircularProgress } from "@mui/material";

interface IConfirmButton {
  children: ReactNode;
  onClick: () => void;
  loading?: boolean;
}

export const ConfirmButton: React.FC<IConfirmButton> = ({
  children,
  onClick,
  loading = false,
}) => {
  return (
    <StyledButton
      color="secondary"
      onClick={loading ? undefined : onClick}
      variant="contained"
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </StyledButton>
  );
};
