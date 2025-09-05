import { UseQueryOptions } from "@tanstack/react-query";
import { getResumoAtivos } from "../getResumoAtivos";

export const KEY_GET_RESUMO_ATIVOS = "key-get-resumo-ativos" as const;

export function getQueryOptionsGetResumoAtivos(
  payload?: IResumoAtivoListPayloadApi
): UseQueryOptions<IResumoAtivo[]> {
  const resumo: UseQueryOptions<IResumoAtivo[]> = {
    queryKey: [KEY_GET_RESUMO_ATIVOS, payload],
    queryFn: () => getResumoAtivos(payload),
  };

  return resumo;
}
