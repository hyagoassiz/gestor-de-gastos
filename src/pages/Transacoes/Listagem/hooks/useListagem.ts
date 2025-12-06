import { useEffect } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import { PaginatedResponse, Transacao } from "@/types";
import { useNavigate } from "react-router-dom";
import * as PATHS from "@/routes/paths";
import { useUrlParams } from "@/hooks/useUrlParams";
import {
  useMutationExcluirTransacao,
  useQueryListarTransacoesPaginado,
} from "@/services/transacoes/transacoes.hooks";

interface UseListagemReturn {
  transacoes: PaginatedResponse<Transacao> | undefined;
  queryListarTransacoesPaginado: UseQueryResult<PaginatedResponse<Transacao>>;
  handleAdicionarTransacao(): void;
  handleEditarTransacao(id: number): void;
  handleExcluirTransacao(id: number): void;
  handleVisualizarTransacao(id: number): void;
}

export const useListagem = (): UseListagemReturn => {
  const { setLoading } = useLoading();

  const navigate = useNavigate();

  const urlParams = useUrlParams();

  const mutationExcluirTransacao = useMutationExcluirTransacao();

  const queryListarTransacoesPaginado = useQueryListarTransacoesPaginado({
    page: urlParams.getBackendPage(),
    tipoMovimentacao: urlParams.getParam("tipoMovimentacao"),
    situacao: urlParams.getParam("situacao"),
    size: 10,
  });

  const transacoes = queryListarTransacoesPaginado.data;

  useEffect(() => {
    const { isFetching, isPlaceholderData } = queryListarTransacoesPaginado;
    setLoading(isFetching && isPlaceholderData);
  }, [
    queryListarTransacoesPaginado.isFetching,
    queryListarTransacoesPaginado.isPlaceholderData,
  ]);

  function handleAdicionarTransacao(): void {
    navigate(PATHS.TRANSACOES.CREATE);
  }

  function handleEditarTransacao(id: number): void {
    const search = urlParams.getSearchString();
    navigate(`${PATHS.TRANSACOES.EDIT.replace(":id", String(id))}${search}`);
  }

  function handleExcluirTransacao(id: number): void {
    mutationExcluirTransacao.mutate(id);
  }

  function handleVisualizarTransacao(id: number): void {
    const search = urlParams.getSearchString();
    navigate(`${PATHS.TRANSACOES.VIEW.replace(":id", String(id))}${search}`);
  }

  return {
    transacoes,
    queryListarTransacoesPaginado,
    handleEditarTransacao,
    handleExcluirTransacao,
    handleAdicionarTransacao,
    handleVisualizarTransacao,
  };
};
