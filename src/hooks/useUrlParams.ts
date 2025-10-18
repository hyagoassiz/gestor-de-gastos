import { useSearchParams, useNavigate } from "react-router-dom";

export type UrlParamsValue = string | number | boolean | null | undefined;

export interface UseUrlParamsReturn {
  getBackendPage: () => number;
  setParams: (params: Record<string, UrlParamsValue>) => void;
  getParam: <T extends UrlParamsValue>(
    key: string,
    defaultValue?: T
  ) => T | undefined;
  getSearchString: () => string;
}

export function useUrlParams(): UseUrlParamsReturn {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  function getPageParam(): number {
    return Number(searchParams.get("pagina")) || 1;
  }

  function getBackendPage(): number {
    return getPageParam() - 1;
  }

  function setParams(params: Record<string, UrlParamsValue>) {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    navigate(`?${newParams.toString()}`, { replace: true });
  }

  function getParam<T extends UrlParamsValue>(
    key: string,
    defaultValue?: T
  ): T | undefined {
    const value = searchParams.get(key);
    if (value === null) return defaultValue;
    if (typeof defaultValue === "number") return Number(value) as T;
    if (typeof defaultValue === "boolean") return (value === "true") as T;
    return value as T;
  }

  function getSearchString(): string {
    const params = new URLSearchParams(searchParams);
    const str = params.toString();
    return str ? `?${str}` : "";
  }

  return { getBackendPage, setParams, getParam, getSearchString };
}
