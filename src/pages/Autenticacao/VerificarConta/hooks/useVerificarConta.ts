import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";

interface UseVerificarContaReturn {
  handleLogin(): void;
}

export const useVerificarConta = (): UseVerificarContaReturn => {
  const navigate = useNavigate();

  const handleLogin = (): void => {
    navigate(PATHS.AUTENTICACAO.LOGIN);
  };

  return {
    handleLogin,
  };
};
