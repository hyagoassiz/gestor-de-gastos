import { UseQueryOptions } from "@tanstack/react-query";
import { getContas } from "../getContas";
import { Conta, ContaParams } from "@/types";

export const KEY_GET_CONTAS = "key-get-contas" as const;

export function queryOptionsGetContas(
  params?: ContaParams
): UseQueryOptions<Conta[]> {
  const contas: UseQueryOptions<Conta[]> = {
    queryKey: [KEY_GET_CONTAS, params],
    queryFn: () => getContas(params),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return contas;
}
