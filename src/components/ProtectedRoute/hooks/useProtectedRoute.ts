import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as PATHS from "../../../routes/paths";
import { usePermission } from "../../../hooks/usePermission";
import useUsuario from "../../../hooks/useUsuario";
import { Usuario } from "@/types/usuario";

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

  function handleNavigate(usuario: Usuario | null): void {
    setSigned(false);

    if (!usuario || !checkPermission(permission) || tokenExpirou(usuario.exp)) {
      navigate(PATHS.AUTENTICACAO.LOGIN);

      setSigned(false);

      return;
    }

    setSigned(true);

    const { pathname } = location;

    if (pathname === PATHS.AUTENTICACAO.VERIFICATION) {
      navigate(PATHS.DASHBOARD.LIST);
    }
  }

  return {
    signed,
  };
};
