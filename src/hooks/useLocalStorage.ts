import { useCallback } from "react";

interface IUseLocalStorageReturn {
  obterToken(): string | null;
  removerToken(): void;
  salvarToken(token: string): void;
  obterDarkMode(): boolean;
  salvarDarkMode(value: boolean): void;
  removerDarkMode(): void;
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

  const obterDarkMode = useCallback((): boolean => {
    const value = localStorage.getItem("darkMode");
    if (value === null) return true;
    return value === "true";
  }, []);

  const salvarDarkMode = useCallback((value: boolean): void => {
    localStorage.setItem("darkMode", String(value));
  }, []);

  const removerDarkMode = useCallback((): void => {
    localStorage.removeItem("darkMode");
  }, []);

  return {
    salvarToken,
    removerToken,
    obterToken,
    obterDarkMode,
    salvarDarkMode,
    removerDarkMode,
  };
};

export default useLocalStorage;
