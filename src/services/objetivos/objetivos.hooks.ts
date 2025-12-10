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
import { objetivosApi } from "./objetivos.api";
import { KEY_LISTAR_OBJETIVOS } from "./hooks/useQueryListarObjetivos";

export const useMutationCriarObjetivo = (
  options?: UseMutationOptions<any, any, any>
) => {
  const loading = useLoading();

  const notification = useNotification();

  const { getSearchString } = useUrlParams();

  const navigate = useNavigate();

  return useMutation({
    ...options,
    mutationFn: objetivosApi.criar,
    onMutate: () => loading.setLoading(true),
    onSettled: () => loading.setLoading(false),
    onSuccess: (data, variables, context) => {
      const search = getSearchString();
      navigate(`${PATHS.OBJETIVOS.LISTAGEM}${search}`);

      notification.showSnackBar(
        `Objetivo ${variables.id ? "editado" : "adicionado"} com sucesso!`,
        "success"
      );

      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useMutationExcluirObjetivo = (
  options?: UseMutationOptions<any, any, any>
) => {
  const queryClient = useQueryClient();

  const loading = useLoading();

  const notification = useNotification();

  return useMutation({
    ...options,
    mutationFn: objetivosApi.excluir,
    onMutate: () => loading.setLoading(true),
    onSettled: () => loading.setLoading(false),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [KEY_LISTAR_OBJETIVOS] });

      notification.showSnackBar(`Objetivo excluído com sucesso!`, "success");

      options?.onSuccess?.(data, variables, context);
    },
  });
};
