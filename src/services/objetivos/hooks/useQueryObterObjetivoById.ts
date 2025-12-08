import { Objetivo } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "@/types/react-query";
import { objetivosApi } from "../objetivos.api";

export const KEY_OBTER_OBJETIVO_BY_ID = "key-obter-objetivo-by-id" as const;

export const useQueryObterObjetivoById = (
  id: number,
  options?: QueryOptions<Objetivo>
) => {
  return useQuery({
    queryKey: [KEY_OBTER_OBJETIVO_BY_ID, id],
    queryFn: () => objetivosApi.obterPorId(id),
    enabled: !!id,
    ...options,
  });
};
