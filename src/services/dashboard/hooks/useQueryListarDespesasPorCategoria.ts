import { DespesaPorCategoria } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "@/types/react-query";
import { dashboardApi } from "../dashboard.api";

export const KEY_LISTAR_DESPESAS_POR_CATEGORIA =
  "key-listar-despesas-por-categoria" as const;

export const useQueryListarDespesasPorCategoria = (
  options?: QueryOptions<DespesaPorCategoria[]>
) => {
  return useQuery({
    queryKey: [KEY_LISTAR_DESPESAS_POR_CATEGORIA],
    queryFn: () => dashboardApi.listarDespesasPorCategoria(),
    placeholderData: (prev) => prev,
    ...options,
  });
};
