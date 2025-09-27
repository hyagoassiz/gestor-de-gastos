import { UseQueryOptions } from "@tanstack/react-query";
import { getContasPaginado } from "../getContasPaginado";
import { IContaListPayloadApi } from "../interfaces/IContaListPayloadApi";

export const KEY_GET_CONTAS_PAGINADO = "key-get-contas-paginado" as const;

export function queryOptionsGetContasPaginado(
  params?: IContaListPayloadApi
): UseQueryOptions<IPaginatedResponse<IContaApi>> {
  const contas: UseQueryOptions<IPaginatedResponse<IContaApi>> = {
    queryKey: [KEY_GET_CONTAS_PAGINADO, params],
    queryFn: () => getContasPaginado(params),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return contas;
}
