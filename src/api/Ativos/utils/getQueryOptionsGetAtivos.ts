import { UseQueryOptions } from "@tanstack/react-query";
import { getAtivos } from "../getAtivos";

export const KEY_GET_ATIVOS = "key-get-ativos" as const;

export function getQueryOptionsGetAtivos(
  payload?: IAtivoListPayloadApi
): UseQueryOptions<IAtivoResponseApi[]> {
  const ativos: UseQueryOptions<IAtivoResponseApi[]> = {
    queryKey: [KEY_GET_ATIVOS, payload],
    queryFn: () => getAtivos(payload),
  };

  return ativos;
}
