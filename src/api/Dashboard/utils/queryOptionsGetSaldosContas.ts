import { ResumoDashboard } from "@/types";
import { UseQueryOptions } from "@tanstack/react-query";
import { getResumoDashboard } from "../getResumoDashboard";

export const KEY_GET_RESUMO_DASHBOARD = "key-get-resumo-dashboard" as const;

export function queryOptionsGetResumoDashboard(): UseQueryOptions<ResumoDashboard> {
  const resumo: UseQueryOptions<ResumoDashboard> = {
    queryKey: [KEY_GET_RESUMO_DASHBOARD],
    queryFn: () => getResumoDashboard(),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return resumo;
}
