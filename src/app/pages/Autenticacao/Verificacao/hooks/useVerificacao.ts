import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { IRootState } from "../../../../shared/interfaces";
import { useSelector } from "react-redux";
import { User } from "firebase/auth";

interface IUseVerificacao {
  userReducer: User | null;
  handleNavigate(): void;
}

export const useVerificacao = (): IUseVerificacao => {
  const userReducer = useSelector((state: IRootState) => state.user);

  const navigate = useNavigate();

  const handleNavigate = (): void => {
    navigate(PATHS.AUTENTICACAO.LOGIN);
  };

  return {
    userReducer,
    handleNavigate,
  };
};
