import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IModalOperacaoState } from "../interfaces";
import { useForm, UseFormReturn } from "react-hook-form";
import { getQueryOptionsGetOperacoes } from "../../../../api/Operacoes/utils/getQueryOptionsGetOperacoes";

interface IUseListagem {
  operacoes: IOperacaoResponseApi[] | undefined;
  operacaoModalState: IModalOperacaoState;
  filterForm: UseFormReturn<IProventoListPayloadApi>;
  filterCount: number;
  closeOperacaoModal(): void;
  handleEditarOperacao(operacao: IOperacaoResponseApi): void;
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
    useState<IProventoListPayloadApi>({ ativoId: "" });

  const filterForm = useForm<IProventoListPayloadApi>({
    defaultValues: { ativoId: operacaoListPayload.ativoId },
  });

  const queryGetOperacoes = useQuery({
    ...getQueryOptionsGetOperacoes(operacaoListPayload),
  });

  const filterCount: number = operacaoListPayload.ativoId === "" ? 0 : 1;

  const operacoes = useMemo(() => {
    return queryGetOperacoes.data;
  }, [queryGetOperacoes.data]);

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

  function handleDuplicarOperacao(operacao: IOperacaoResponseApi): void {
    setOperacaoModalState({ operacao, open: true, isDuplicating: true });
  }

  function handleSubmitFilterForm(): void {
    filterForm.handleSubmit((data) => {
      setOperacaoListPayload({ ativoId: data.ativoId });
    })();
  }

  return {
    operacoes,
    operacaoModalState,
    filterForm,
    filterCount,
    closeOperacaoModal,
    handleEditarOperacao,
    handleDuplicarOperacao,
    handleSubmitFilterForm,
    openOperacaoModal,
    setOperacaoListPayload,
  };
};
