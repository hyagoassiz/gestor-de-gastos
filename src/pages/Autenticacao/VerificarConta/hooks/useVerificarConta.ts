import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { IRootState } from "../../../../redux/store";
import { useSelector } from "react-redux";

interface UseVerificarContaReturn {
  email: string | null;
  handleNavigate(): void;
}

export const useVerificarConta = (): UseVerificarContaReturn => {
  const { email } = useSelector((state: IRootState) => state.usuario);

  const navigate = useNavigate();

  const handleNavigate = (): void => {
    navigate(PATHS.AUTENTICACAO.LOGIN);
  };

  return {
    email,
    handleNavigate,
  };
};
