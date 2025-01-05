import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { IRootState, IUsuario } from "../../../../shared/interfaces";
import { useSelector } from "react-redux";

interface IUseVerificacao {
  userReducer: IUsuario | null;
  handleNavigate: () => void;
}

export const useVerificacao = (): IUseVerificacao => {
  const userReducer = useSelector((state: IRootState) => state.user);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(PATHS.AUTENTICACAO.LOGIN);
  };

  return {
    userReducer,
    handleNavigate,
  };
};
