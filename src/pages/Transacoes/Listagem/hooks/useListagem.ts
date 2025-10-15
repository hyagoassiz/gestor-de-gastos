import { useEffect, useState } from "react";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  KEY_GET_TRANSACOES_PAGINADO,
  queryOptionsGetTransacoesPaginado,
} from "../../../../api/Transacao/utils/queryOptionsGetTransacoesPaginado";
import { useNotification } from "../../../../hooks/useNotification";
import { deleteTransacao } from "../../../../api/Transacao/deleteTransacao";
import { Transacao, TransacaoParamsPaginado } from "@/types";
import { useNavigate } from "react-router-dom";
import * as PATHS from "@/routes/paths";

interface IUseListagemReturn {
  transacoes: IPaginatedResponse<Transacao> | undefined;
  queryGetTransacoesPaginado: UseQueryResult<IPaginatedResponse<Transacao>>;
  filterForm: UseFormReturn<TransacaoParamsPaginado>;
  filterCount: number;
  transacaoListPayload: TransacaoParamsPaginado;
  handleAdicionarTransacao(): void;
  handleEditarTransacao(transacaoId: string): void;
  handleExcluirTransacao(idTransacao: number): Promise<void>;
  handleChangePage(page: number, size?: number): void;
  handleSubmitFilterForm(): void;
}

export const useListagem = (): IUseListagemReturn => {
  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const filterForm = useForm<TransacaoParamsPaginado>();

  const [transacaoListPayload, setTransacaoListPayload] =
    useState<TransacaoParamsPaginado>({ page: 0, size: 10 });

  const queryGetTransacoesPaginado = useQuery({
    ...queryOptionsGetTransacoesPaginado(transacaoListPayload),
  });

  const filterCount: number = transacaoListPayload.pago === true ? 0 : 1;

  const transacoes = queryGetTransacoesPaginado.data;

  useEffect(() => {
    setLoading(queryGetTransacoesPaginado.isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryGetTransacoesPaginado.isLoading]);

  function handleAdicionarTransacao(): void {
    navigate(PATHS.TRANSACOES.CREATE);
  }

  function handleEditarTransacao(transacaoId: string): void {
    navigate(PATHS.TRANSACOES.EDIT.replace(":id", transacaoId));
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

  function handleChangePage(page: number, size?: number): void {
    setTransacaoListPayload((prev) => ({
      ...prev,
      page: page,
      size: size ?? prev.size,
    }));
  }

  function handleSubmitFilterForm(): void {
    filterForm.handleSubmit((data) => {
      setTransacaoListPayload((prevState) => ({
        ...prevState,
        tipoMovimentacao: data.tipoMovimentacao,
        page: 0,
      }));
    })();
  }

  return {
    transacoes,
    queryGetTransacoesPaginado,
    filterForm,
    filterCount,
    transacaoListPayload,
    handleEditarTransacao,
    handleExcluirTransacao,
    handleAdicionarTransacao,
    handleChangePage,
    handleSubmitFilterForm,
  };
};
