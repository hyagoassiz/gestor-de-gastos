import { keepPreviousData, UseQueryOptions } from "@tanstack/react-query";
import { getContasPaginado } from "../getContasPaginado";
import { Conta, ContaParamsPaginado } from "@/types";

export const KEY_GET_CONTAS_PAGINADO = "key-get-contas-paginado" as const;

export function queryOptionsGetContasPaginado(
  params?: ContaParamsPaginado
): UseQueryOptions<IPaginatedResponse<Conta>> {
  const contas: UseQueryOptions<IPaginatedResponse<Conta>> = {
    queryKey: [KEY_GET_CONTAS_PAGINADO, params],
    queryFn: () => getContasPaginado(params),
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  };

  return contas;
}
