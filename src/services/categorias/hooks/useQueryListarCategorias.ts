import { Categoria, CategoriaParams } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "@/types/react-query";
import { categoriasApi } from "../categorias.api";

export const KEY_LISTAR_CATEGORIAS = "key-listar-categorias" as const;

export const useQueryListarCategorias = (
  params: CategoriaParams,
  options?: QueryOptions<Categoria[]>
) => {
  return useQuery({
    queryKey: [KEY_LISTAR_CATEGORIAS, params],
    queryFn: () => categoriasApi.listar(params),
    placeholderData: (prev) => prev,
    ...options,
  });
};
