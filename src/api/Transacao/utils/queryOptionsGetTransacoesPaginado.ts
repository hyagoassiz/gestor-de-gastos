import { UseQueryOptions } from "@tanstack/react-query";
import { ITransacaoApi, ITransacaoListPayloadApi } from "../interfaces";
import { getTransacoesPaginado } from "../getTransacoesPaginado";

export const KEY_GET_TRANSACOES_PAGINADO =
  "key-get-transacoes-paginado" as const;

export function queryOptionsGetTransacoesPaginado(
  params?: ITransacaoListPayloadApi
): UseQueryOptions<IPaginatedResponse<ITransacaoApi>> {
  const transacoes: UseQueryOptions<IPaginatedResponse<ITransacaoApi>> = {
    queryKey: [KEY_GET_TRANSACOES_PAGINADO, params],
    queryFn: () => getTransacoesPaginado(params),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return transacoes;
}
