import { UseQueryOptions } from "@tanstack/react-query";
import { getTransacoes } from "../getTransacoes";
import { Transacao, TransacaoParams } from "@/types";

export const KEY_GET_TRANSACOES = "key-get-transacoes" as const;

export function queryOptionsGetTransacoes(
  params?: TransacaoParams
): UseQueryOptions<Transacao[]> {
  const transacoes: UseQueryOptions<Transacao[]> = {
    queryKey: [KEY_GET_TRANSACOES, params],
    queryFn: () => getTransacoes(params),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return transacoes;
}
