import { useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocalStorage } from "./useLocalStorage";
import { Usuario } from "@/types";

interface UseUsuarioReturn {
  obterUsuario(): Usuario | null;
  removerUsuario(): void;
  salvarUsuario(token: string): void;
}

const useUsuario = (): UseUsuarioReturn => {
  const localStorage = useLocalStorage();

  const obterUsuario = useCallback((): Usuario | null => {
    const token = localStorage.obter("token");

    if (token) {
      return jwtDecode(token);
    }

    return null;
  }, []);

  const removerUsuario = useCallback((): void => {
    localStorage.remover("token");
  }, []);

  const salvarUsuario = useCallback((token: string): void => {
    localStorage.salvar("token", token);
  }, []);

  return { salvarUsuario, removerUsuario, obterUsuario };
};

export default useUsuario;
