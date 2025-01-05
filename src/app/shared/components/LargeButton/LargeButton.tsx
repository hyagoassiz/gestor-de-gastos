import { ReactNode } from "react";
import { StyledButton } from "./styles/style";
import { CircularProgress } from "@mui/material";

interface ILargeButton {
  children: ReactNode;
  loading?: boolean;
  onClick: () => void;
}

export const LargeButton: React.FC<ILargeButton> = ({
  children,
  loading = false,
  onClick,
}) => {
  return (
    <StyledButton
      color="primary"
      onClick={loading ? undefined : onClick}
      variant="contained"
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </StyledButton>
  );
};
