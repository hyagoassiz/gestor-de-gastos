import { keepPreviousData, UseQueryOptions } from "@tanstack/react-query";
import { getTransacoesPaginado } from "../getTransacoesPaginado";
import { PaginatedResponse, Transacao, TransacaoParamsPaginado } from "@/types";

export const KEY_GET_TRANSACOES_PAGINADO =
  "key-get-transacoes-paginado" as const;

export function queryOptionsGetTransacoesPaginado(
  params?: TransacaoParamsPaginado
): UseQueryOptions<PaginatedResponse<Transacao>> {
  const transacoes: UseQueryOptions<PaginatedResponse<Transacao>> = {
    queryKey: [KEY_GET_TRANSACOES_PAGINADO, params],
    queryFn: () => getTransacoesPaginado(params),
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  };

  return transacoes;
}
