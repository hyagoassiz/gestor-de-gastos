import { keepPreviousData, UseQueryOptions } from "@tanstack/react-query";
import { getCategoriasPaginado } from "../getCategoriasPaginado";
import { Categoria, CategoriaParamsPaginado } from "@/types";

export const KEY_GET_CATEGORIAS_PAGINADO =
  "key-get-categorias-paginado" as const;

export function queryOptionsGetCategoriasPaginado(
  params?: CategoriaParamsPaginado
): UseQueryOptions<IPaginatedResponse<Categoria>> {
  const categorias: UseQueryOptions<IPaginatedResponse<Categoria>> = {
    queryKey: [KEY_GET_CATEGORIAS_PAGINADO, params],
    queryFn: () => getCategoriasPaginado(params),
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  };

  return categorias;
}
