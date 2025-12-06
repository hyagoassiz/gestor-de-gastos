import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useLoading } from "@/hooks/useLoading";
import { useNotification } from "@/hooks/useNotification";
import { useNavigate } from "react-router-dom";
import * as PATHS from "@/routes/paths";
import { usuariosApi } from "./usuarios.api";

export const useMutationCriarContaUsuario = (
  options?: UseMutationOptions<any, any, any>
) => {
  const loading = useLoading();

  const notification = useNotification();

  const navigate = useNavigate();

  return useMutation({
    ...options,
    mutationFn: usuariosApi.criar,
    onMutate: () => loading.setLoading(true),
    onSettled: () => loading.setLoading(false),
    onSuccess: (data, variables, context) => {
      navigate(PATHS.AUTENTICACAO.LOGIN);

      notification.showSnackBar(`Conta criada com sucesso!`, "success");

      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useMutationLogin = (
  options?: UseMutationOptions<any, any, any>
) => {
  const loading = useLoading();

  const navigate = useNavigate();

  return useMutation({
    ...options,
    mutationFn: usuariosApi.login,
    onMutate: () => loading.setLoading(true),
    onSettled: () => loading.setLoading(false),
    onSuccess: (data, variables, context) => {
      navigate(PATHS.DASHBOARD.LIST);

      options?.onSuccess?.(data, variables, context);
    },
  });
};
