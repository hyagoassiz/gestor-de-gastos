import { TransacaoMensal } from "@/types";
import { UseQueryOptions } from "@tanstack/react-query";
import { getTransacaoMensal } from "../getTransacaoMensal";

export const KEY_GET_TRANSACAO_MENSAL = "key-get-transacao-mensal" as const;

export function queryOptionsGetTransacaoMensal(): UseQueryOptions<
  TransacaoMensal[]
> {
  const transacao: UseQueryOptions<TransacaoMensal[]> = {
    queryKey: [KEY_GET_TRANSACAO_MENSAL],
    queryFn: () => getTransacaoMensal(),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return transacao;
}
