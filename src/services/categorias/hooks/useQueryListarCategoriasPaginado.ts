import { Categoria, CategoriaParamsPaginado, PaginatedResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { categoriasApi } from "../categorias.api";
import { QueryOptions } from "@/types/react-query";

export const KEY_LISTAR_CATEGORIAS_PAGINADO =
  "key-listar-categorias-paginado" as const;

export const useQueryListarCategoriasPaginado = (
  params: CategoriaParamsPaginado,
  options?: QueryOptions<PaginatedResponse<Categoria>>
) => {
  return useQuery({
    queryKey: [KEY_LISTAR_CATEGORIAS_PAGINADO, params],
    queryFn: () => categoriasApi.listarPaginado(params),
    placeholderData: (prev) => prev,
    ...options,
  });
};
