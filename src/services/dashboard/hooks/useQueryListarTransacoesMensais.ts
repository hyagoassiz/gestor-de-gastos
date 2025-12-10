import { TransacaoMensal } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "@/types/react-query";
import { dashboardApi } from "../dashboard.api";

export const KEY_LISTAR_TRANSACOES_MENSAIS =
  "key-listar-transacoes-mensais" as const;

export const useQueryListarTransacoesMensais = (
  options?: QueryOptions<TransacaoMensal[]>
) => {
  return useQuery({
    queryKey: [KEY_LISTAR_TRANSACOES_MENSAIS],
    queryFn: () => dashboardApi.listarTransacoesMensais(),
    placeholderData: (prev) => prev,
    ...options,
  });
};
