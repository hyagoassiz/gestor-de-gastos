import { useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocalStorage } from "./useLocalStorage";
import { Usuario } from "@/types";

interface IUseUsuarioReturn {
  obterUsuario(): Usuario | null;
  removerUsuario(): void;
  salvarUsuario(token: string): void;
}

const useUsuario = (): IUseUsuarioReturn => {
  const localStorage = useLocalStorage();

  const obterUsuario = useCallback((): Usuario | null => {
    const token = localStorage.obter("token");

    if (token) {
      return jwtDecode(token);
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removerUsuario = useCallback((): void => {
    localStorage.remover("token");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const salvarUsuario = useCallback((token: string): void => {
    localStorage.salvar("token", token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { salvarUsuario, removerUsuario, obterUsuario };
};

export default useUsuario;
