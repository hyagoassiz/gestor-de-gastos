import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { contasApi } from "./contas.api";
import { useLoading } from "@/hooks/useLoading";
import { useNotification } from "@/hooks/useNotification";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useNavigate } from "react-router-dom";
import * as PATHS from "@/routes/paths";
import { KEY_LISTAR_CONTAS_PAGINADO } from "./hooks/useQueryListarContasPaginado";
import { KEY_LISTAR_SALDOS } from "./hooks/useQueryListarSaldos";

export const useMutationCriarConta = (
  options?: UseMutationOptions<any, any, any>
) => {
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
      queryClient.invalidateQueries({ queryKey: [KEY_LISTAR_CONTAS_PAGINADO] });

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
      queryClient.invalidateQueries({ queryKey: [KEY_LISTAR_SALDOS] });

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
      queryClient.invalidateQueries({ queryKey: [KEY_LISTAR_SALDOS] });

      notification.showSnackBar(`Saldo ajustado com sucesso!`, "success");

      options?.onSuccess?.(data, variables, context);
    },
  });
};
