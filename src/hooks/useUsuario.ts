import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";
import { jwtDecode } from "jwt-decode";
import { clearUsuario } from "../redux/usuarioSlice";

interface IUseUsuarioReturn {
  obterUsuario(): IUsuarioApi | null;
  removerUsuario(): void;
  salvarUsuario(token: string): void;
}

const useUsuario = (): IUseUsuarioReturn => {
  const { removerToken, obterToken, salvarToken } = useLocalStorage();

  const obterUsuario = useCallback((): IUsuarioApi | null => {
    const token = obterToken();

    if (token) {
      return jwtDecode(token);
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removerUsuario = useCallback((): void => {
    removerToken();
    clearUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const salvarUsuario = useCallback((token: string): void => {
    salvarToken(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { salvarUsuario, removerUsuario, obterUsuario };
};

export default useUsuario;
