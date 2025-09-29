import { UseQueryOptions } from "@tanstack/react-query";
import { getTransacoesPaginado } from "../getTransacoesPaginado";
import { Transacao, TransacaoParamsPaginado } from "@/types";

export const KEY_GET_TRANSACOES_PAGINADO =
  "key-get-transacoes-paginado" as const;

export function queryOptionsGetTransacoesPaginado(
  params?: TransacaoParamsPaginado
): UseQueryOptions<IPaginatedResponse<Transacao>> {
  const transacoes: UseQueryOptions<IPaginatedResponse<Transacao>> = {
    queryKey: [KEY_GET_TRANSACOES_PAGINADO, params],
    queryFn: () => getTransacoesPaginado(params),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return transacoes;
}
