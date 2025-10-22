import { useEffect } from "react";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import { useNotification } from "../../../../hooks/useNotification";
import { updateStatusConta } from "../../../../api/Contas/updateStatusConta";
import {
  KEY_GET_CONTAS_PAGINADO,
  queryOptionsGetContasPaginado,
} from "../../../../api/Contas/utils/queryOptionsGetContasPaginado";
import useSearchBar from "../../../../hooks/useSearchBar";
import { ISeachBar } from "../../../../interfaces/ISearchBar";
import { Conta } from "@/types";
import { useNavigate } from "react-router-dom";
import * as PATHS from "@/routes/paths";
import { useUrlParams } from "@/hooks/useUrlParams";

interface UseListagemReturn {
  contas: IPaginatedResponse<Conta> | undefined;
  queryGetContasPaginado: UseQueryResult<IPaginatedResponse<Conta>>;
  searchBar: ISeachBar;
  handleAdicionarConta(): void;
  handleAtivarContaById(id: number): Promise<void>;
  handleEditarConta(contaId: string): void;
  handleInativarContaById(id: number): void;
}

export const useListagem = (): UseListagemReturn => {
  const loading = useLoading();

  const notification = useNotification();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { searchBar } = useSearchBar({});

  const { getBackendPage, getParam, getSearchString } = useUrlParams();

  const queryGetContasPaginado = useQuery({
    ...queryOptionsGetContasPaginado({
      page: getBackendPage(),
      ativo: getParam("ativo") === "false" ? false : true,
      incluirEmSomas: getParam("incluirEmSomas"),
      textoBusca: getParam("textoBusca"),
      tipoConta: getParam("tipoConta"),
      size: 10,
    }),
  });

  const contas = queryGetContasPaginado.data;

  useEffect(() => {
    loading.setLoading(queryGetContasPaginado.isLoading);
  }, [queryGetContasPaginado.isLoading]);

  async function handleAtivarContaById(id: number): Promise<void> {
    try {
      loading.setLoading(true);
      await updateStatusConta({ id, ativo: true });
      queryClient.invalidateQueries({ queryKey: [KEY_GET_CONTAS_PAGINADO] });
      notification.showSnackBar("Conta ativada com sucesso!", "success");
    } catch (error) {
      console.error(error);
    } finally {
      loading.setLoading(false);
    }
  }

  function handleEditarConta(contaId: string): void {
    const search = getSearchString();
    navigate(`${PATHS.CONTAS.EDIT.replace(":id", contaId)}${search}`);
  }

  function handleAdicionarConta(): void {
    navigate(PATHS.CONTAS.CREATE);
  }

  async function handleInativarContaById(id: number): Promise<void> {
    try {
      loading.setLoading(true);

      await updateStatusConta({ id, ativo: false });

      queryClient.invalidateQueries({ queryKey: [KEY_GET_CONTAS_PAGINADO] });

      notification.showSnackBar("Conta inativada com sucesso!", "success");
    } catch (error) {
      console.error(error);
    } finally {
      loading.setLoading(false);
    }
  }

  return {
    contas,
    queryGetContasPaginado,
    searchBar,
    handleAdicionarConta,
    handleAtivarContaById,
    handleEditarConta,
    handleInativarContaById,
  };
};
