import { UseQueryOptions } from "@tanstack/react-query";
import { getProventos } from "../getProventos";

export const KEY_GET_PROVENTOS = "key-get-proventos" as const;

export function getQueryOptionsGetProventos(
  payload?: IProventoListPayloadApi
): UseQueryOptions<IProventoResponseApi[]> {
  const ativos: UseQueryOptions<IProventoResponseApi[]> = {
    queryKey: [KEY_GET_PROVENTOS, payload],
    queryFn: () => getProventos(payload),
  };

  return ativos;
}
