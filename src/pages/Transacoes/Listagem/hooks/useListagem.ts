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
import { IModalTransacaoState } from "../interfaces";
import { useNotification } from "../../../../hooks/useNotification";
import { deleteTransacao } from "../../../../api/Transacao/deleteTransacao";
import { Transacao, TransacaoParamsPaginado } from "@/types";

interface IUseListagemReturn {
  transacoes: IPaginatedResponse<Transacao> | undefined;
  queryGetTransacoesPaginado: UseQueryResult<IPaginatedResponse<Transacao>>;
  filterForm: UseFormReturn<TransacaoParamsPaginado>;
  filterCount: number;
  transacaoListPayload: TransacaoParamsPaginado;
  modalTransacaoState: IModalTransacaoState;
  closeModalTransacao(): void;
  handleAdicionarTransacao(): void;
  handleEditarTransacao(transacao: Transacao): void;
  handleExcluirTransacao(idTransacao: number): Promise<void>;
  handleChangePage(page: number, size?: number): void;
  handleSubmitFilterForm(): void;
}

export const useListagem = (): IUseListagemReturn => {
  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryClient = useQueryClient();

  const filterForm = useForm<TransacaoParamsPaginado>();

  const [transacaoListPayload, setTransacaoListPayload] =
    useState<TransacaoParamsPaginado>({ page: 0, size: 10 });

  const [modalTransacaoState, setModalTransacaoState] =
    useState<IModalTransacaoState>({ open: false, transacao: null });

  const queryGetTransacoesPaginado = useQuery({
    ...queryOptionsGetTransacoesPaginado(transacaoListPayload),
  });

  const filterCount: number = transacaoListPayload.pago === true ? 0 : 1;

  const transacoes = queryGetTransacoesPaginado.data;

  useEffect(() => {
    setLoading(queryGetTransacoesPaginado.isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryGetTransacoesPaginado.isLoading]);

  function closeModalTransacao(): void {
    setModalTransacaoState({ open: false, transacao: null });
  }

  function handleAdicionarTransacao(): void {
    setModalTransacaoState({ open: true, transacao: null });
  }

  function handleEditarTransacao(transacao: Transacao): void {
    setModalTransacaoState({ open: true, transacao });
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
        pago: !data.pago,
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
    modalTransacaoState,
    handleEditarTransacao,
    handleExcluirTransacao,
    closeModalTransacao,
    handleAdicionarTransacao,
    handleChangePage,
    handleSubmitFilterForm,
  };
};
