import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IFilterForm, IModalProventoState } from "../interfaces";
import { useForm, UseFormReturn } from "react-hook-form";
import { getQueryOptionsGetProventos } from "../../../../api/Proventos/utils/getQueryOptionsGetProventos";
import { useLoading } from "../../../../hooks/useLoading";
import { getQueryOptionsGetAtivos } from "../../../../api/Ativos/utils/getQueryOptionsGetAtivos";
import { deleteProventoById } from "../../../../api/Proventos/deleteProventoById";
import { useNotification } from "../../../../hooks/useNotification";

interface IUseList {
  ativos: IAtivoResponseApi[] | undefined;
  proventos: IProventoResponseApi[] | undefined;
  modalProventoState: IModalProventoState;
  filterForm: UseFormReturn<IFilterForm>;
  filterCount: number;
  closeModalProvento(): void;
  handleDuplicarProvento(provento: IProventoResponseApi): void;
  handleEditProventos(provento: IProventoResponseApi): void;
  handleExcluirProvento(id: string): Promise<void>;
  handleSubmitFilterForm(): void;
  openModalProvento(): void;
  setProventosListPayload: Dispatch<SetStateAction<IProventoListPayloadApi>>;
}

export const useList = (): IUseList => {
  const [modalProventoState, setModalProventoState] =
    useState<IModalProventoState>({
      provento: null,
      open: false,
      isDuplicating: false,
    });

  const [proventoListPayload, setProventosListPayload] =
    useState<IProventoListPayloadApi>({ ativoIds: [] });

  const filterForm = useForm<IFilterForm>();

  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryGetAtivos = useQuery({
    ...getQueryOptionsGetAtivos({ ativo: true }),
  });

  const querygetProventos = useQuery({
    ...getQueryOptionsGetProventos(proventoListPayload),
  });

  const filterCount: number = proventoListPayload?.ativoIds?.length ?? 0;

  const ativos = useMemo(() => {
    return queryGetAtivos.data;
  }, [queryGetAtivos.data]);

  const proventos = useMemo(() => {
    return querygetProventos.data;
  }, [querygetProventos.data]);

  useEffect(() => {
    setLoading(querygetProventos.isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [querygetProventos.isLoading]);

  function openModalProvento(): void {
    setModalProventoState({ provento: null, open: true, isDuplicating: false });
  }

  function closeModalProvento(): void {
    setModalProventoState({
      provento: null,
      open: false,
      isDuplicating: false,
    });
  }

  function handleDuplicarProvento(provento: IProventoResponseApi): void {
    setModalProventoState({ provento, open: true, isDuplicating: true });
  }

  function handleEditProventos(provento: IProventoResponseApi): void {
    setModalProventoState({ provento, open: true, isDuplicating: false });
  }

  async function handleExcluirProvento(id: string): Promise<void> {
    try {
      setLoading(true);

      await deleteProventoById(id);

      showSnackBar(`Provento excluído com sucesso!`, "success");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      querygetProventos.refetch();
    }
  }

  function handleSubmitFilterForm(): void {
    filterForm.handleSubmit((data) => {
      const ativoIds = data.ativos.map((ativo) => ativo.id);

      setProventosListPayload({ ativoIds });
    })();
  }

  return {
    ativos,
    proventos,
    modalProventoState,
    filterForm,
    filterCount,
    closeModalProvento,
    handleEditProventos,
    handleExcluirProvento,
    handleDuplicarProvento,
    handleSubmitFilterForm,
    openModalProvento,
    setProventosListPayload,
  };
};
