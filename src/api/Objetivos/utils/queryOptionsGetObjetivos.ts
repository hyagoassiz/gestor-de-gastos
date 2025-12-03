import { UseQueryOptions } from "@tanstack/react-query";
import { Objetivo, ObjetivoParams } from "@/types";
import { getObjetivos } from "../getObjetivos";

export const KEY_GET_OBJETIVOS = "key-get-objetivos" as const;

export function queryOptionsGetObjetivos(
  params?: ObjetivoParams
): UseQueryOptions<Objetivo[]> {
  const objetivos: UseQueryOptions<Objetivo[]> = {
    queryKey: [KEY_GET_OBJETIVOS, params],
    queryFn: () => getObjetivos(params),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return objetivos;
}
