import { DespesaPorCategoria } from "@/types";
import { UseQueryOptions } from "@tanstack/react-query";
import { getDespesasPorCategoria } from "../getDespesasPorCategoria";

export const KEY_GET_DESPESAS_POR_CATEGORIA =
  "key-get-despesas-por-categoria" as const;

export function queryOptionsGetDespesasPorCategoria(): UseQueryOptions<
  DespesaPorCategoria[]
> {
  const despesas: UseQueryOptions<DespesaPorCategoria[]> = {
    queryKey: [KEY_GET_DESPESAS_POR_CATEGORIA],
    queryFn: () => getDespesasPorCategoria(),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return despesas;
}
