import { UseQueryOptions } from "@tanstack/react-query";
import { getContas } from "../getContas";

export const KEY_GET_CONTAS = "key-get-contas" as const;

export function queryOptionsGetContas(
  payload?: IContaListPayloadApi
): UseQueryOptions<IContaApi[]> {
  const contas: UseQueryOptions<IContaApi[]> = {
    queryKey: [KEY_GET_CONTAS, payload],
    queryFn: () => getContas(payload),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return contas;
}
