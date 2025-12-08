import { PaginatedResponse, Transacao, TransacaoParamsPaginado } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "@/types/react-query";
import { transacoesApi } from "../transacoes.api";

export const KEY_LISTAR_TRANSACOES_PAGINADO =
  "key-listar-transacoes-paginado" as const;

export const useQueryListarTransacoesPaginado = (
  params: TransacaoParamsPaginado,
  options?: QueryOptions<PaginatedResponse<Transacao>>
) => {
  return useQuery({
    queryKey: [KEY_LISTAR_TRANSACOES_PAGINADO, params],
    queryFn: () => transacoesApi.listarPaginado(params),
    placeholderData: (prev) => prev,
    ...options,
  });
};
