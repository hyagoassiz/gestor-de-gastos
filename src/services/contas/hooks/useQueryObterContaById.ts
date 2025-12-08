import { Conta } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "@/types/react-query";
import { contasApi } from "../contas.api";

export const KEY_OBTER_CONTA_BY_ID = "key-obter-conta-by-id" as const;

export const useQueryObterContaById = (
  id: number,
  options?: QueryOptions<Conta>
) => {
  return useQuery({
    queryKey: [KEY_OBTER_CONTA_BY_ID, id],
    queryFn: () => contasApi.obterPorId(id),
    enabled: !!id,
    ...options,
  });
};
