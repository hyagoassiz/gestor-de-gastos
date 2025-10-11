import { Totais } from "@/types";
import { UseQueryOptions } from "@tanstack/react-query";
import { getTotais } from "../getTotatis";

export const KEY_GET_TOTAIS = "key-get-totais" as const;

export function queryOptionsGetTotais(): UseQueryOptions<Totais> {
  const totais: UseQueryOptions<Totais> = {
    queryKey: [KEY_GET_TOTAIS],
    queryFn: () => getTotais(),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return totais;
}
