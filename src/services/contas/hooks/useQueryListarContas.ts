import { Conta, ContaParams } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "@/types/react-query";
import { contasApi } from "../contas.api";

export const KEY_LISTAR_CONTAS = "key-listar-contas" as const;

export const useQueryListarContas = (
  params: ContaParams,
  options?: QueryOptions<Conta[]>
) => {
  return useQuery({
    queryKey: [KEY_LISTAR_CONTAS, params],
    queryFn: () => contasApi.listar(params),
    placeholderData: (prev) => prev,
    ...options,
  });
};
