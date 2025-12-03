import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { contasApi } from "./contas.api";
import { ContaParams, ContaParamsPaginado } from "@/types";
import { useLoading } from "@/hooks/useLoading";
import { useNotification } from "@/hooks/useNotification";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useNavigate } from "react-router-dom";
import * as PATHS from "@/routes/paths";

export const KEY_GET_CONTAS = "key-get-contas" as const;

export const useQueryListarContas = (
  params?: ContaParams,
  options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [KEY_GET_CONTAS, params],
    queryFn: () => contasApi.listar(params),
    ...options,
  });
};

export const useQueryListarContasPaginado = (
  params?: ContaParamsPaginado,
  options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [KEY_GET_CONTAS, params],
    queryFn: () => contasApi.listarPaginado(params),
    ...options,
  });
};

export const useQueryObterContaById = (id: number) => {
  return useQuery({
    queryKey: [[KEY_GET_CONTAS, id]],
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
    mutationFn: contasApi.criar,
    onMutate: () => loading.setLoading(true),
    onSettled: () => loading.setLoading(false),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [KEY_GET_CONTAS] });

      const search = getSearchString();
      navigate(`${PATHS.CONTAS.LISTAGEM}${search}`);

      notification.showSnackBar(
        `Conta ${variables.id ? "editada" : "adicionada"} com sucesso!`,
        "success"
      );

      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useMutationAtualizarStatusConta = (
  options?: UseMutationOptions<any, any, any>
) => {
  const queryClient = useQueryClient();

  const loading = useLoading();

  const notification = useNotification();

  return useMutation({
    mutationFn: contasApi.atualizarStatus,
    onMutate: () => loading.setLoading(true),
    onSettled: () => loading.setLoading(false),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [KEY_GET_CONTAS] });

      notification.showSnackBar(
        `Conta ${variables.ativo ? "ativada" : "inativada"} com sucesso!`,
        "success"
      );

      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
