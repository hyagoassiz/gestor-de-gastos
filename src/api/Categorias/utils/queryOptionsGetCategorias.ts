import { UseQueryOptions } from "@tanstack/react-query";
import { getCategorias } from "../getCategorias";

export const KEY_GET_CATEGORIAS = "key-get-categorias" as const;

export function queryOptionsGetCategorias(
  payload?: ICategoriaListPayloadApi
): UseQueryOptions<ICategoriaApi[]> {
  const contas: UseQueryOptions<ICategoriaApi[]> = {
    queryKey: [KEY_GET_CATEGORIAS, payload],
    queryFn: () => getCategorias(payload),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return contas;
}
