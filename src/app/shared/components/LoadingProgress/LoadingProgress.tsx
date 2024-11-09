import { CircularProgress } from "@mui/material";
import { useLoadingProgress } from "./hooks/useLoadingProgress";
import { StyledBox } from "./styles";

export const LoadingProgress: React.FC = () => {
  const { loading } = useLoadingProgress();

  return (
    <>
      {loading.open ? (
        <StyledBox>
          <CircularProgress size={60} color="secondary" />
        </StyledBox>
      ) : null}
    </>
  );
};
