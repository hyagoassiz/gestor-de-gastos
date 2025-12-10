import { Transacao, TransacaoParams } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "@/types/react-query";
import { transacoesApi } from "../transacoes.api";

export const KEY_LISTAR_TRANSACOES = "key-listar-transacoes" as const;

export const useQueryListarTransacoes = (
  params?: TransacaoParams,
  options?: QueryOptions<Transacao[]>
) => {
  return useQuery({
    queryKey: [KEY_LISTAR_TRANSACOES, params],
    queryFn: () => transacoesApi.listar(params),
    placeholderData: (prev) => prev,
    ...options,
  });
};
