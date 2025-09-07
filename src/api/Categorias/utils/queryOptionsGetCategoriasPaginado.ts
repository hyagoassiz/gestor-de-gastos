import { UseQueryOptions } from "@tanstack/react-query";
import { getCategoriasPaginado } from "../getCategoriasPaginado";

export const KEY_GET_CATEGORIAS_PAGINADO =
  "key-get-categorias-paginado" as const;

export function queryOptionsGetCategoriasPaginado(
  params?: ICategoriaListPayloadApi
): UseQueryOptions<IPaginatedResponse<ICategoriaApi>> {
  const categorias: UseQueryOptions<IPaginatedResponse<ICategoriaApi>> = {
    queryKey: [KEY_GET_CATEGORIAS_PAGINADO, params],
    queryFn: () => getCategoriasPaginado(params),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return categorias;
}
