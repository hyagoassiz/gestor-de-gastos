import { UseQueryOptions } from "@tanstack/react-query";
import { getContas } from "../getContas";
import { IContaListPayloadApi } from "../interfaces/IContaListPayloadApi";
import { IContaApi } from "../interfaces/IContaApi";

export const KEY_GET_CONTAS = "key-get-contas" as const;

export function queryOptionsGetContas(
  params?: IContaListPayloadApi
): UseQueryOptions<IContaApi[]> {
  const contas: UseQueryOptions<IContaApi[]> = {
    queryKey: [KEY_GET_CONTAS, params],
    queryFn: () => getContas(params),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return contas;
}
