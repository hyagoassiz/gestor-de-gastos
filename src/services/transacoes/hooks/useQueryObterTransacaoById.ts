import { Transacao } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "@/types/react-query";
import { transacoesApi } from "../transacoes.api";

export const KEY_OBTER_TRANSACAO_BY_ID = "key-obter-transacao-by-id" as const;

export const useQueryObterTransacaoById = (
  id: number,
  options?: QueryOptions<Transacao>
) => {
  return useQuery({
    queryKey: [KEY_OBTER_TRANSACAO_BY_ID, id],
    queryFn: () => transacoesApi.obterPorId(id),
    enabled: !!id,
    ...options,
  });
};
