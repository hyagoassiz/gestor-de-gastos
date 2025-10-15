import { UseQueryOptions } from "@tanstack/react-query";
import { Transacao } from "@/types";
import { getTransacaoById } from "../getTransacaoById";

export const KEY_GET_TRANSACAO_BY_ID = "key-get-transacao-by-id" as const;

export function queryOptionsGetTransacaoById(
  transacaoId: number
): UseQueryOptions<Transacao> {
  const transacao: UseQueryOptions<Transacao> = {
    queryKey: [KEY_GET_TRANSACAO_BY_ID, transacaoId],
    queryFn: () => getTransacaoById(transacaoId),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return transacao;
}
