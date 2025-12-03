import { UseQueryOptions } from "@tanstack/react-query";
import { Objetivo } from "@/types";
import { getObjetivoById } from "../getObjetivoById";

export const KEY_GET_OBJETIVO_BY_ID = "key-get-objetivo-by-id" as const;

export function queryOptionsGetObjetivoById(
  objetivoId: number
): UseQueryOptions<Objetivo> {
  const objetivo: UseQueryOptions<Objetivo> = {
    queryKey: [KEY_GET_OBJETIVO_BY_ID, objetivoId],
    queryFn: () => getObjetivoById(objetivoId),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return objetivo;
}
