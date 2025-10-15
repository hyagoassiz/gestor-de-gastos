import { UseQueryOptions } from "@tanstack/react-query";
import { Conta } from "@/types";
import { getContaById } from "../getContaById";

export const KEY_GET_CONTA_BY_ID = "key-get-conta-by-id" as const;

export function queryOptionsGetContaById(
  contaId: string
): UseQueryOptions<Conta> {
  const contas: UseQueryOptions<Conta> = {
    queryKey: [KEY_GET_CONTA_BY_ID, contaId],
    queryFn: () => getContaById(contaId),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return contas;
}
