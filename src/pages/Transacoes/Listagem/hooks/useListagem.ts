import { useEffect } from "react";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import {
  KEY_GET_TRANSACOES_PAGINADO,
  queryOptionsGetTransacoesPaginado,
} from "../../../../api/Transacao/utils/queryOptionsGetTransacoesPaginado";
import { useNotification } from "../../../../hooks/useNotification";
import { deleteTransacao } from "../../../../api/Transacao/deleteTransacao";
import { PaginatedResponse, Transacao } from "@/types";
import { useNavigate } from "react-router-dom";
import * as PATHS from "@/routes/paths";
import { useUrlParams } from "@/hooks/useUrlParams";

interface UseListagemReturn {
  transacoes: PaginatedResponse<Transacao> | undefined;
  queryGetTransacoesPaginado: UseQueryResult<PaginatedResponse<Transacao>>;
  handleAdicionarTransacao(): void;
  handleEditarTransacao(transacaoId: number): void;
  handleExcluirTransacao(transacaoId: number): Promise<void>;
  handleVisualizarTransacao(transacaoId: number): void;
}

export const useListagem = (): UseListagemReturn => {
  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const urlParams = useUrlParams();

  const queryGetTransacoesPaginado = useQuery({
    ...queryOptionsGetTransacoesPaginado({
      page: urlParams.getBackendPage(),
      tipoMovimentacao: urlParams.getParam("tipoMovimentacao"),
      situacao: urlParams.getParam("situacao"),
      size: 10,
    }),
  });

  const transacoes = queryGetTransacoesPaginado.data;

  useEffect(() => {
    setLoading(queryGetTransacoesPaginado.isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryGetTransacoesPaginado.isLoading]);

  function handleAdicionarTransacao(): void {
    navigate(PATHS.TRANSACOES.CREATE);
  }

  function handleEditarTransacao(transacaoId: number): void {
    const search = urlParams.getSearchString();
    navigate(
      `${PATHS.TRANSACOES.EDIT.replace(":id", String(transacaoId))}${search}`
    );
  }

  async function handleExcluirTransacao(transacaoId: number): Promise<void> {
    try {
      setLoading(true);

      await deleteTransacao(transacaoId);

      showSnackBar(`Transação excluída com sucesso!`, "success");

      queryClient.invalidateQueries({
        queryKey: [KEY_GET_TRANSACOES_PAGINADO],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleVisualizarTransacao(transacaoId: number): void {
    const search = urlParams.getSearchString();
    navigate(
      `${PATHS.TRANSACOES.VIEW.replace(":id", String(transacaoId))}${search}`
    );
  }

  return {
    transacoes,
    queryGetTransacoesPaginado,
    handleEditarTransacao,
    handleExcluirTransacao,
    handleAdicionarTransacao,
    handleVisualizarTransacao,
  };
};
