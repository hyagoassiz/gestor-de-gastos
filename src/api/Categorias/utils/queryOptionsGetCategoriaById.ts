import { UseQueryOptions } from "@tanstack/react-query";
import { Categoria } from "@/types";
import { getCategoriaById } from "../getCategoriaById";

export const KEY_GET_CATEGORIA_BY_ID = "key-get-categoria-by-id" as const;

export function queryOptionsGetCategoriaById(
  categoriaId: string
): UseQueryOptions<Categoria> {
  const categoria: UseQueryOptions<Categoria> = {
    queryKey: [KEY_GET_CATEGORIA_BY_ID, categoriaId],
    queryFn: () => getCategoriaById(categoriaId),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return categoria;
}
