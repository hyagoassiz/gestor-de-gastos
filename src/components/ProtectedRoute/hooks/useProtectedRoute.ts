import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as PATHS from "../../../routes/paths";
import { usePermission } from "../../../hooks/usePermission";
import useUsuario from "../../../hooks/useUsuario";

interface IUseLoginProps {
  permission: string;
}

interface IUseLoginReturn {
  signed: boolean;
}

export const useProtectedRoute = ({
  permission,
}: IUseLoginProps): IUseLoginReturn => {
  const [signed, setSigned] = useState<boolean>(false);

  const navigate = useNavigate();

  const location = useLocation();

  const { checkPermission } = usePermission();

  const { obterUsuario } = useUsuario();

  useEffect(() => {
    handleNavigate(obterUsuario());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  function tokenExpirou(exp: number | null): boolean {
    if (!exp) {
      return true;
    }

    const agora = Date.now() / 1000;

    return exp < agora;
  }

  function handleNavigate(user: IUsuarioApi | null): void {
    setSigned(false);

    if (!user || !checkPermission(permission) || tokenExpirou(user.exp)) {
      navigate(PATHS.AUTH.LOGIN);

      setSigned(false);

      return;
    }

    setSigned(true);

    if (!user.nome) {
      navigate(PATHS.AUTH.INFO);

      return;
    }

    const { pathname } = location;

    if (pathname === PATHS.AUTH.VERIFICATION || pathname === PATHS.AUTH.INFO) {
      navigate(PATHS.DASHBOARD.LIST);
    }
  }

  return {
    signed,
  };
};
