import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  Transacao,
  TransacaoParams,
  TransacaoParamsPaginado,
  PaginatedResponse,
} from "@/types";
import { useLoading } from "@/hooks/useLoading";
import { useNotification } from "@/hooks/useNotification";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useNavigate } from "react-router-dom";
import * as PATHS from "@/routes/paths";
import { transacoesApi } from "./transacoes.api";

export const KEY_TRANSACOES = "key-transacoes" as const;

export const useQueryListarTransacoes = (
  params?: TransacaoParams,
  options?: Omit<UseQueryOptions<Transacao[]>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [KEY_TRANSACOES, params],
    queryFn: () => transacoesApi.listar(params),
    ...options,
  });
};

export const useQueryListarTransacoesPaginado = (
  params?: TransacaoParamsPaginado,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<Transacao>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: [KEY_TRANSACOES, params],
    queryFn: () => transacoesApi.listarPaginado(params),
    placeholderData: (prev) => prev,
    ...options,
  });
};

export const useQueryObterTransacaoById = (id: number) => {
  return useQuery({
    queryKey: [[KEY_TRANSACOES, id]],
    queryFn: () => transacoesApi.obterPorId(id),
    enabled: !!id,
  });
};

export const useMutationCriarTransacao = (
  options?: UseMutationOptions<any, any, any>
) => {
  const queryClient = useQueryClient();

  const loading = useLoading();

  const notification = useNotification();

  const { getSearchString } = useUrlParams();

  const navigate = useNavigate();

  return useMutation({
    ...options,
    mutationFn: transacoesApi.criar,
    onMutate: () => loading.setLoading(true),
    onSettled: () => loading.setLoading(false),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [KEY_TRANSACOES] });

      const search = getSearchString();
      navigate(`${PATHS.TRANSACOES.LIST}${search}`);

      notification.showSnackBar(
        `Transação ${variables.id ? "editada" : "adicionada"} com sucesso!`,
        "success"
      );

      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useMutationExcluirTransacao = (
  options?: UseMutationOptions<any, any, any>
) => {
  const queryClient = useQueryClient();

  const loading = useLoading();

  const notification = useNotification();

  return useMutation({
    ...options,
    mutationFn: transacoesApi.excluir,
    onMutate: () => loading.setLoading(true),
    onSettled: () => loading.setLoading(false),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [KEY_TRANSACOES] });

      notification.showSnackBar(`Transação excluída com sucesso!`, "success");

      options?.onSuccess?.(data, variables, context);
    },
  });
};
