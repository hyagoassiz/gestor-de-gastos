import { UseQueryOptions } from "@tanstack/react-query";
import { getCategorias } from "../getCategorias";

export const KEY_GET_CATEGORIAS = "key-get-categorias" as const;

export function queryOptionsGetCategorias(
  params?: ICategoriaListPayloadApi
): UseQueryOptions<ICategoriaApi[]> {
  const categorias: UseQueryOptions<ICategoriaApi[]> = {
    queryKey: [KEY_GET_CATEGORIAS, params],
    queryFn: () => getCategorias(params),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return categorias;
}
