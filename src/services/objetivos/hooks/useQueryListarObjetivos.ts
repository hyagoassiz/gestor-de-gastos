import { Objetivo, ObjetivoParams } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "@/types/react-query";
import { objetivosApi } from "../objetivos.api";

export const KEY_LISTAR_OBJETIVOS = "key-listar-objetivos" as const;

export const useQueryListarObjetivos = (
  params?: ObjetivoParams,
  options?: QueryOptions<Objetivo[]>
) => {
  return useQuery({
    queryKey: [KEY_LISTAR_OBJETIVOS, params],
    queryFn: () => objetivosApi.listar(params),
    placeholderData: (prev) => prev,
    ...options,
  });
};
