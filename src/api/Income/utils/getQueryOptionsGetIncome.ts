import { UseQueryOptions } from "@tanstack/react-query";
import { getIncome } from "../getIncome";

export const KEY_GET_INCOME = "key-get-income" as const;

export function getQueryOptionsGetIncome(
  payload?: IIncomeListPayloadApi
): UseQueryOptions<IIncomeResponseApi[]> {
  const ativos: UseQueryOptions<IIncomeResponseApi[]> = {
    queryKey: [KEY_GET_INCOME, payload],
    queryFn: () => getIncome(payload),
  };

  return ativos;
}
