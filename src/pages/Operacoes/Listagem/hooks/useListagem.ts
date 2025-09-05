import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IFilterForm, IModalOperacaoState } from "../interfaces";
import { useForm, UseFormReturn } from "react-hook-form";
import { getQueryOptionsGetOperacoes } from "../../../../api/Operacoes/utils/getQueryOptionsGetOperacoes";
import { useLoading } from "../../../../hooks/useLoading";
import { getQueryOptionsGetAtivos } from "../../../../api/Ativos/utils/getQueryOptionsGetAtivos";
import { deleteOperacaoById } from "../../../../api/Operacoes/deleteOperacaoById";
import { useNotification } from "../../../../hooks/useNotification";

interface IUseListagem {
  ativos: IAtivoResponseApi[] | undefined;
  operacoes: IOperacaoResponseApi[] | undefined;
  operacaoModalState: IModalOperacaoState;
  filterForm: UseFormReturn<IFilterForm>;
  filterCount: number;
  closeOperacaoModal(): void;
  handleEditarOperacao(operacao: IOperacaoResponseApi): void;
  handleExcluirOperacao(id: string): Promise<void>;
  handleDuplicarOperacao(operacao: IOperacaoResponseApi): void;
  handleSubmitFilterForm(): void;
  openOperacaoModal(): void;
  setOperacaoListPayload: Dispatch<SetStateAction<IProventoListPayloadApi>>;
}

export const useListagem = (): IUseListagem => {
  const [operacaoModalState, setOperacaoModalState] =
    useState<IModalOperacaoState>({
      operacao: null,
      open: false,
      isDuplicating: false,
    });

  const [operacaoListPayload, setOperacaoListPayload] =
    useState<IProventoListPayloadApi>({ ativoIds: [] });

  const filterForm = useForm<IFilterForm>();

  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryGetAtivos = useQuery({
    ...getQueryOptionsGetAtivos({ ativo: true }),
  });

  const queryGetOperacoes = useQuery({
    ...getQueryOptionsGetOperacoes(operacaoListPayload),
  });

  const filterCount: number = operacaoListPayload.ativoIds?.length ?? 0;

  const ativos = useMemo(() => {
    return queryGetAtivos.data;
  }, [queryGetAtivos.data]);

  const operacoes = useMemo(() => {
    return queryGetOperacoes.data;
  }, [queryGetOperacoes.data]);

  useEffect(() => {
    setLoading(queryGetOperacoes.isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryGetOperacoes.isLoading]);

  function openOperacaoModal(): void {
    setOperacaoModalState({ operacao: null, open: true, isDuplicating: false });
  }

  function closeOperacaoModal(): void {
    setOperacaoModalState({
      operacao: null,
      open: false,
      isDuplicating: false,
    });
  }

  function handleEditarOperacao(operacao: IOperacaoResponseApi): void {
    setOperacaoModalState({ operacao, open: true, isDuplicating: false });
  }

  async function handleExcluirOperacao(id: string): Promise<void> {
    try {
      setLoading(true);

      await deleteOperacaoById(id);

      showSnackBar(`Operação excluída com sucesso!`, "success");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      queryGetOperacoes.refetch();
    }
  }

  function handleDuplicarOperacao(operacao: IOperacaoResponseApi): void {
    setOperacaoModalState({ operacao, open: true, isDuplicating: true });
  }

  function handleSubmitFilterForm(): void {
    filterForm.handleSubmit((data) => {
      const ativoIds = data.ativos.map((ativo) => ativo.id);

      setOperacaoListPayload({ ativoIds });
    })();
  }

  return {
    ativos,
    operacoes,
    operacaoModalState,
    filterForm,
    filterCount,
    closeOperacaoModal,
    handleEditarOperacao,
    handleExcluirOperacao,
    handleDuplicarOperacao,
    handleSubmitFilterForm,
    openOperacaoModal,
    setOperacaoListPayload,
  };
};
