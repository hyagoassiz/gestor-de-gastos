import { useCallback } from "react";

interface IUseLocalStorageReturn {
  obterToken(): string | null;
  removerToken(): void;
  salvarToken(token: string): void;
}

const useLocalStorage = (): IUseLocalStorageReturn => {
  const obterToken = useCallback((): string | null => {
    return localStorage.getItem("token");
  }, []);

  const removerToken = useCallback((): void => {
    localStorage.removeItem("token");
  }, []);

  const salvarToken = useCallback((token: string): void => {
    localStorage.setItem("token", token);
  }, []);

  return { salvarToken, removerToken, obterToken };
};

export default useLocalStorage;
