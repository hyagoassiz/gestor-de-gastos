import { Categoria } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "@/types/react-query";
import { categoriasApi } from "../categorias.api";

export const KEY_OBTER_CATEGORIA_BY_ID = "key-obter-categoria-by-id" as const;

export const useQueryObterCategoriaById = (
  id: number,
  options?: QueryOptions<Categoria>
) => {
  return useQuery({
    queryKey: [KEY_OBTER_CATEGORIA_BY_ID, id],
    queryFn: () => categoriasApi.obterPorId(id),
    enabled: !!id,
    ...options,
  });
};
