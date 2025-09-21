import { UseQueryOptions } from "@tanstack/react-query";
import { getTransacoes } from "../getTransacoes";
import { ITransacaoApi, ITransacaoListPayloadApi } from "../interfaces";

export const KEY_GET_TRANSACOES = "key-get-transacoes" as const;

export function queryOptionsGetTransacoes(
  params?: ITransacaoListPayloadApi
): UseQueryOptions<ITransacaoApi[]> {
  const transacoes: UseQueryOptions<ITransacaoApi[]> = {
    queryKey: [KEY_GET_TRANSACOES, params],
    queryFn: () => getTransacoes(params),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return transacoes;
}
