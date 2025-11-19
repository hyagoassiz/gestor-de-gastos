import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as PATHS from "../../../routes/paths";
import { usePermission } from "../../../hooks/usePermission";
import useUsuario from "../../../hooks/useUsuario";
import { Usuario } from "@/types";

interface UseLoginProps {
  permission: string;
}

interface UseLoginReturn {
  signed: boolean;
}

export const useProtectedRoute = ({
  permission,
}: UseLoginProps): UseLoginReturn => {
  const [signed, setSigned] = useState<boolean>(false);

  const navigate = useNavigate();

  const location = useLocation();

  const { checkPermission } = usePermission();

  const { obterUsuario } = useUsuario();

  useEffect(() => {
    handleNavigate(obterUsuario());
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
