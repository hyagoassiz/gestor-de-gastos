import { SaldoConta, SaldoContaParams } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "@/types/react-query";
import { contasApi } from "../contas.api";

export const KEY_LISTAR_SALDOS = "key-listar-saldos" as const;

export const useQueryListarSaldos = (
  params?: SaldoContaParams,
  options?: QueryOptions<SaldoConta[]>
) => {
  return useQuery({
    queryKey: [KEY_LISTAR_SALDOS, params],
    queryFn: () => contasApi.listarSaldos(params),
    placeholderData: (prev) => prev,
    ...options,
  });
};
