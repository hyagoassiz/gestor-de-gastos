import { Totais } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "@/types/react-query";
import { dashboardApi } from "../dashboard.api";

export const KEY_LISTAR_TOTAIS_GERAIS = "key-listar-totais-gerais" as const;

export const useQueryListarTotaisGerais = (options?: QueryOptions<Totais>) => {
  return useQuery({
    queryKey: [KEY_LISTAR_TOTAIS_GERAIS],
    queryFn: () => dashboardApi.listarTotaisGerais(),
    placeholderData: (prev) => prev,
    ...options,
  });
};
