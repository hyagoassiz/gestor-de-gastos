import { UseQueryOptions } from "@tanstack/react-query";
import { getOperacoes } from "../getOperacoes";

export const KEY_GET_OPERACOES = "key-get-operacoes" as const;

export function getQueryOptionsGetOperacoes(
  payload?: IOperacaoListPayloadApi
): UseQueryOptions<IOperacaoResponseApi[]> {
  const assets: UseQueryOptions<IOperacaoResponseApi[]> = {
    queryKey: [KEY_GET_OPERACOES, payload],
    queryFn: () => getOperacoes(payload),
  };

  return assets;
}
