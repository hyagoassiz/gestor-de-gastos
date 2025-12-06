import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { dashboardApi } from "./dashboard.api";
import { DespesaPorCategoria, Totais, TransacaoMensal } from "@/types";

export const KEY_DASHBOARD = "key-dashboard" as const;

export const useQueryListarDespesasPorCategoria = (
  options?: Omit<UseQueryOptions<DespesaPorCategoria[]>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [KEY_DASHBOARD],
    queryFn: () => dashboardApi.listarDespesasPorCategoria(),
    ...options,
  });
};

export const useQueryListarTotaisGerais = (
  options?: Omit<UseQueryOptions<Totais>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [KEY_DASHBOARD],
    queryFn: () => dashboardApi.listarTotaisGerais(),
    ...options,
  });
};

export const useQueryListarTransacoesMensais = (
  options?: Omit<UseQueryOptions<TransacaoMensal[]>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [KEY_DASHBOARD],
    queryFn: () => dashboardApi.listarTransacoesMensais(),
    ...options,
  });
};
