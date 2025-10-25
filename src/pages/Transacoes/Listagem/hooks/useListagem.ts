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
import { Transacao } from "@/types";
import { useNavigate } from "react-router-dom";
import * as PATHS from "@/routes/paths";
import { useUrlParams } from "@/hooks/useUrlParams";

interface IUseListagemReturn {
  transacoes: IPaginatedResponse<Transacao> | undefined;
  queryGetTransacoesPaginado: UseQueryResult<IPaginatedResponse<Transacao>>;
  handleAdicionarTransacao(): void;
  handleEditarTransacao(transacaoId: string): void;
  handleExcluirTransacao(idTransacao: number): Promise<void>;
}

export const useListagem = (): IUseListagemReturn => {
  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { getBackendPage, getParam, getSearchString } = useUrlParams();

  const queryGetTransacoesPaginado = useQuery({
    ...queryOptionsGetTransacoesPaginado({
      page: getBackendPage(),
      tipoMovimentacao: getParam("tipoMovimentacao"),
      situacao: getParam("situacao"),
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

  function handleEditarTransacao(transacaoId: string): void {
    const search = getSearchString();
    navigate(`${PATHS.TRANSACOES.EDIT.replace(":id", transacaoId)}${search}`);
  }

  async function handleExcluirTransacao(idTransacao: number): Promise<void> {
    try {
      setLoading(true);

      await deleteTransacao(idTransacao);

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

  return {
    transacoes,
    queryGetTransacoesPaginado,
    handleEditarTransacao,
    handleExcluirTransacao,
    handleAdicionarTransacao,
  };
};
