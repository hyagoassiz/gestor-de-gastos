import { Conta, ContaParamsPaginado, PaginatedResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "@/types/react-query";
import { contasApi } from "../contas.api";

export const KEY_LISTAR_CONTAS_PAGINADO = "key-listar-contas-paginado" as const;

export const useQueryListarContasPaginado = (
  params: ContaParamsPaginado,
  options?: QueryOptions<PaginatedResponse<Conta>>
) => {
  return useQuery({
    queryKey: [KEY_LISTAR_CONTAS_PAGINADO, params],
    queryFn: () => contasApi.listarPaginado(params),
    placeholderData: (prev) => prev,
    ...options,
  });
};
