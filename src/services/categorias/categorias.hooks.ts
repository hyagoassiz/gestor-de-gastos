import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  Categoria,
  CategoriaParams,
  CategoriaParamsPaginado,
  PaginatedResponse,
} from "@/types";
import { useLoading } from "@/hooks/useLoading";
import { useNotification } from "@/hooks/useNotification";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useNavigate } from "react-router-dom";
import * as PATHS from "@/routes/paths";
import { categoriasApi } from "./categorias.api";

export const KEY_CATEGORIAS = "key-categorias" as const;

export const useQueryListarCategorias = (
  params?: CategoriaParams,
  options?: Omit<UseQueryOptions<Categoria[]>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [KEY_CATEGORIAS, params],
    queryFn: () => categoriasApi.listar(params),
    ...options,
  });
};

export const useQueryListarCategoriasPaginado = (
  params?: CategoriaParamsPaginado,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<Categoria>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: [KEY_CATEGORIAS, params],
    queryFn: () => categoriasApi.listarPaginado(params),
    placeholderData: (prev) => prev,
    ...options,
  });
};

export const useQueryObterCategoriaById = (id: number) => {
  return useQuery({
    queryKey: [[KEY_CATEGORIAS, id]],
    queryFn: () => categoriasApi.obterPorId(id),
    enabled: !!id,
  });
};

export const useMutationCriarCategoria = (
  options?: UseMutationOptions<any, any, any>
) => {
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: [KEY_CATEGORIAS] });

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
      queryClient.invalidateQueries({ queryKey: [KEY_CATEGORIAS] });

      notification.showSnackBar(
        `Categoria ${variables.ativo ? "ativada" : "inativada"} com sucesso!`,
        "success"
      );

      options?.onSuccess?.(data, variables, context);
    },
  });
};
