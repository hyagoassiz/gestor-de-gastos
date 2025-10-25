import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";

interface UseVerificarContaReturn {
  handleNavigate(): void;
}

export const useVerificarConta = (): UseVerificarContaReturn => {
  const navigate = useNavigate();

  const handleNavigate = (): void => {
    navigate(PATHS.AUTENTICACAO.LOGIN);
  };

  return {
    handleNavigate,
  };
};
