import { Objetivo } from "@/types";
import * as PATHS from "@/routes/paths";
import { useNavigate } from "react-router-dom";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useMutationExcluirObjetivo } from "@/services/objetivos/objetivos.hooks";
import { useQueryListarObjetivos } from "@/services/objetivos/hooks/useQueryListarObjetivos";

interface UseListagemReturn {
  objetivos: Objetivo[] | undefined;
  handleAdicionarObjetivo(): void;
  handleEditarObjetivo(id: number): void;
  handleExcluirObjetivo(id: number): void;
}

const useListagem = (): UseListagemReturn => {
  const queryGetObjetivos = useQueryListarObjetivos();

  const navigate = useNavigate();

  const objetivos = queryGetObjetivos.data;

  const mutationExcluirObjetivo = useMutationExcluirObjetivo();

  const { getSearchString } = useUrlParams();

  function handleAdicionarObjetivo(): void {
    navigate(PATHS.OBJETIVOS.CADASTRO);
  }

  function handleEditarObjetivo(id: number): void {
    const search = getSearchString();
    navigate(`${PATHS.OBJETIVOS.EDITAR.replace(":id", String(id))}${search}`);
  }

  function handleExcluirObjetivo(id: number): void {
    mutationExcluirObjetivo.mutate(id);
  }

  return {
    objetivos,
    handleAdicionarObjetivo,
    handleEditarObjetivo,
    handleExcluirObjetivo,
  };
};

export default useListagem;
