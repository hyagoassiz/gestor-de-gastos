import { SaldoConta, SaldoContaParams } from "@/types";
import { UseQueryOptions } from "@tanstack/react-query";
import { getSaldosContas } from "../getSaldosContas";

export const KEY_GET_SALDOS_CONTAS = "key-get-saldos-contas" as const;

export function queryOptionsGetSaldosContas(
  params?: SaldoContaParams
): UseQueryOptions<SaldoConta[]> {
  const saldosContas: UseQueryOptions<SaldoConta[]> = {
    queryKey: [KEY_GET_SALDOS_CONTAS, params],
    queryFn: () => getSaldosContas(params),
    refetchOnWindowFocus: false,
    retry: false,
  };

  return saldosContas;
}
