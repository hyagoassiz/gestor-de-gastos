import { useEffect } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import useSearchBar from "../../../../hooks/useSearchBar";
import { Conta, PaginatedResponse, SearchBar } from "@/types";
import { useNavigate } from "react-router-dom";
import * as PATHS from "@/routes/paths";
import { useUrlParams } from "@/hooks/useUrlParams";
import {
  useMutationAtualizarStatusConta,
  useQueryListarContasPaginado,
} from "@/services/contas/contas.hooks";

interface UseListagemReturn {
  contas: PaginatedResponse<Conta> | undefined;
  queryListarContasPaginado: UseQueryResult<PaginatedResponse<Conta>>;
  searchBar: SearchBar;
  handleAdicionarConta(): void;
  handleAtivarContaById(id: number): void;
  handleEditarConta(id: number): void;
  handleInativarContaById(id: number): void;
}

export const useListagem = (): UseListagemReturn => {
  const loading = useLoading();

  const urlParams = useUrlParams();

  const { searchBar } = useSearchBar({});

  const navigate = useNavigate();

  const mutationAtualizarStatusConta = useMutationAtualizarStatusConta();

  const queryListarContasPaginado = useQueryListarContasPaginado({
    page: urlParams.getBackendPage(),
    ativo: urlParams.getParam("ativo") === "false" ? false : true,
    incluirEmSomas: urlParams.getParam("incluirEmSomas"),
    textoBusca: urlParams.getParam("textoBusca"),
    tipoConta: urlParams.getParam("tipoConta"),
    size: 10,
  });

  const contas = queryListarContasPaginado.data;

  useEffect(() => {
    loading.setLoading(queryListarContasPaginado.isLoading);
  }, [queryListarContasPaginado.isLoading]);

  function handleAtivarContaById(id: number): void {
    mutationAtualizarStatusConta.mutate({ id: id, ativo: true });
  }

  function handleEditarConta(id: number): void {
    const search = urlParams.getSearchString();
    navigate(`${PATHS.CONTAS.EDIT.replace(":id", String(id))}${search}`);
  }

  function handleAdicionarConta(): void {
    navigate(PATHS.CONTAS.CREATE);
  }

  function handleInativarContaById(id: number): void {
    mutationAtualizarStatusConta.mutate({ id: id, ativo: false });
  }

  return {
    contas,
    queryListarContasPaginado,
    searchBar,
    handleAdicionarConta,
    handleAtivarContaById,
    handleEditarConta,
    handleInativarContaById,
  };
};
