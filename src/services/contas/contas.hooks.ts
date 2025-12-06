import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { contasApi } from "./contas.api";
import {
  Conta,
  ContaParams,
  ContaParamsPaginado,
  PaginatedResponse,
  SaldoConta,
  SaldoContaParams,
} from "@/types";
import { useLoading } from "@/hooks/useLoading";
import { useNotification } from "@/hooks/useNotification";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useNavigate } from "react-router-dom";
import * as PATHS from "@/routes/paths";

export const KEY_CONTAS = "key-contas" as const;

export const useQueryListarContas = (
  params?: ContaParams,
  options?: Omit<UseQueryOptions<Conta[]>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [KEY_CONTAS, params],
    queryFn: () => contasApi.listar(params),
    ...options,
  });
};

export const useQueryListarContasPaginado = (
  params?: ContaParamsPaginado,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<Conta>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: [KEY_CONTAS, params],
    queryFn: () => contasApi.listarPaginado(params),
    placeholderData: (prev) => prev,
    ...options,
  });
};

export const useQueryListarSaldos = (
  params?: SaldoContaParams,
  options?: Omit<UseQueryOptions<SaldoConta[]>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [KEY_CONTAS, params],
    queryFn: () => contasApi.listarSaldos(params),
    ...options,
  });
};

export const useQueryObterContaById = (id: number) => {
  return useQuery({
    queryKey: [[KEY_CONTAS, id]],
    queryFn: () => contasApi.obterPorId(id),
    enabled: !!id,
  });
};

export const useMutationCriarConta = (
  options?: UseMutationOptions<any, any, any>
) => {
  const queryClient = useQueryClient();

  const loading = useLoading();

  const notification = useNotification();

  const { getSearchString } = useUrlParams();

  const navigate = useNavigate();

  return useMutation({
    ...options,
    mutationFn: contasApi.criar,
    onMutate: () => loading.setLoading(true),
    onSettled: () => loading.setLoading(false),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [KEY_CONTAS] });

      const search = getSearchString();
      navigate(`${PATHS.CONTAS.LISTAGEM}${search}`);

      notification.showSnackBar(
        `Conta ${variables.id ? "editada" : "adicionada"} com sucesso!`,
        "success"
      );

      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useMutationAtualizarStatusConta = (
  options?: UseMutationOptions<any, any, any>
) => {
  const queryClient = useQueryClient();

  const loading = useLoading();

  const notification = useNotification();

  return useMutation({
    ...options,
    mutationFn: contasApi.atualizarStatus,
    onMutate: () => loading.setLoading(true),
    onSettled: () => loading.setLoading(false),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [KEY_CONTAS] });

      notification.showSnackBar(
        `Conta ${variables.ativo ? "ativada" : "inativada"} com sucesso!`,
        "success"
      );

      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useMutationTransferirSaldo = (
  options?: UseMutationOptions<any, any, any>
) => {
  const queryClient = useQueryClient();

  const loading = useLoading();

  const notification = useNotification();

  return useMutation({
    ...options,
    mutationFn: contasApi.transferirSaldo,
    onMutate: () => loading.setLoading(true),
    onSettled: () => loading.setLoading(false),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [KEY_CONTAS] });

      notification.showSnackBar(
        `Transferência realizada com sucesso!`,
        "success"
      );

      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useMutationAjustarSaldoConta = (
  options?: UseMutationOptions<any, any, any>
) => {
  const queryClient = useQueryClient();

  const loading = useLoading();

  const notification = useNotification();

  return useMutation({
    ...options,
    mutationFn: contasApi.ajustarSaldo,
    onMutate: () => loading.setLoading(true),
    onSettled: () => loading.setLoading(false),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [KEY_CONTAS] });

      notification.showSnackBar(`Saldo ajustado com sucesso!`, "success");

      options?.onSuccess?.(data, variables, context);
    },
  });
};
