import {
  KEY_GET_OBJETIVOS,
  queryOptionsGetObjetivos,
} from "@/api/Objetivos/utils/queryOptionsGetObjetivos";
import { Objetivo } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as PATHS from "@/routes/paths";
import { useNavigate } from "react-router-dom";
import { useUrlParams } from "@/hooks/useUrlParams";
import { deleteObjetivo } from "@/api/Objetivos/deleteObjetivo";
import { useNotification } from "@/hooks/useNotification";
import { useLoading } from "@/hooks/useLoading";

interface UseListagemReturn {
  objetivos: Objetivo[] | undefined;
  handleAdicionarObjetivo(): void;
  handleEditarObjetivo(objetivoId: number): void;
  handleExcluirObjetivo(idObjetivo: number): void;
}

const useListagem = (): UseListagemReturn => {
  const queryGetObjetivos = useQuery({ ...queryOptionsGetObjetivos() });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const notification = useNotification();

  const loading = useLoading();

  const objetivos = queryGetObjetivos.data;

  const mutateDeleteObjetivo = useMutation({
    mutationFn: deleteObjetivo,
    onMutate: () => loading.setLoading(true),
    onSettled: () => loading.setLoading(false),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEY_GET_OBJETIVOS],
      });
      notification.showSnackBar("Objetivo excluído com sucesso!", "success");
    },
  });

  const { getSearchString } = useUrlParams();

  function handleAdicionarObjetivo(): void {
    navigate(PATHS.OBJETIVOS.CADASTRO);
  }

  function handleEditarObjetivo(objetivoId: number): void {
    const search = getSearchString();
    navigate(
      `${PATHS.OBJETIVOS.EDITAR.replace(":id", String(objetivoId))}${search}`
    );
  }

  function handleExcluirObjetivo(idObjetivo: number): void {
    mutateDeleteObjetivo.mutate(idObjetivo);
  }

  return {
    objetivos,
    handleAdicionarObjetivo,
    handleEditarObjetivo,
    handleExcluirObjetivo,
  };
};

export default useListagem;
