import { useCallback } from "react";

interface UseLocalStorageReturn {
  obter<T = string>(key: string): T | null;
  salvar<T = string>(key: string, value: T): void;
  remover(key: string): void;
}

export function useLocalStorage(): UseLocalStorageReturn {
  const obter = useCallback(<T = string>(key: string): T | null => {
    const item = localStorage.getItem(key);
    if (item === null) return null;

    try {
      return JSON.parse(item) as T;
    } catch {
      return item as unknown as T;
    }
  }, []);

  const salvar = useCallback(<T = string>(key: string, value: T): void => {
    const valueToStore =
      typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, valueToStore);
  }, []);

  const remover = useCallback((key: string): void => {
    localStorage.removeItem(key);
  }, []);

  return { obter, salvar, remover };
}
