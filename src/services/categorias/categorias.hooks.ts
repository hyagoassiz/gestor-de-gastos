import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useLoading } from "@/hooks/useLoading";
import { useNotification } from "@/hooks/useNotification";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useNavigate } from "react-router-dom";
import * as PATHS from "@/routes/paths";
import { categoriasApi } from "./categorias.api";
import { KEY_LISTAR_CATEGORIAS_PAGINADO } from "./hooks/useQueryListarCategoriasPaginado";

export const useMutationCriarCategoria = (
  options?: UseMutationOptions<any, any, any>
) => {
  const loading = useLoading();

  const notification = useNotification();

  const { getSearchString } = useUrlParams();

  const navigate = useNavigate();

  return useMutation({
    ...options,
    mutationFn: categoriasApi.criar,
    onMutate: () => loading.setLoading(true),
    onSettled: () => loading.setLoading(false),
    onSuccess: (data, variables, context) => {
      const search = getSearchString();
      navigate(`${PATHS.CATEGORIAS.LISTAGEM}${search}`);

      notification.showSnackBar(
        `Categoria ${variables.id ? "editada" : "adicionada"} com sucesso!`,
        "success"
      );

      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useMutationAtualizarStatusCategoria = (
  options?: UseMutationOptions<any, any, any>
) => {
  const queryClient = useQueryClient();

  const loading = useLoading();

  const notification = useNotification();

  return useMutation({
    ...options,
    mutationFn: categoriasApi.atualizarStatus,
    onMutate: () => loading.setLoading(true),
    onSettled: () => loading.setLoading(false),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [KEY_LISTAR_CATEGORIAS_PAGINADO],
      });

      notification.showSnackBar(
        `Categoria ${variables.ativo ? "ativada" : "inativada"} com sucesso!`,
        "success"
      );

      options?.onSuccess?.(data, variables, context);
    },
  });
};
