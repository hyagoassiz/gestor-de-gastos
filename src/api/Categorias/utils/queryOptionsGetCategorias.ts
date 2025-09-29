import { UseQueryOptions } from "@tanstack/react-query";
import { getCategorias } from "../getCategorias";
import { Categoria, CategoriaParams } from "@/types";

export const KEY_GET_CATEGORIAS = "key-get-categorias" as const;

export function queryOptionsGetCategorias(
  params?: CategoriaParams
): UseQueryOptions<Categoria[]> {
  const categorias: UseQueryOptions<Categoria[]> = {
    queryKey: [KEY_GET_CATEGORIAS, params],
    queryFn: () => getCategorias(params),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return categorias;
}
