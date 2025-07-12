import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IModalProventoState } from "../interfaces";
import { useForm, UseFormReturn } from "react-hook-form";
import { getQueryOptionsGetProventos } from "../../../../api/Proventos/utils/getQueryOptionsGetProventos";

interface IUseList {
  proventos: IProventoResponseApi[] | undefined;
  modalProventoState: IModalProventoState;
  filterForm: UseFormReturn<IProventoListPayloadApi>;
  filterCount: number;
  closeModalProvento(): void;
  handleDuplicarProvento(provento: IProventoResponseApi): void;
  handleEditProventos(provento: IProventoResponseApi): void;
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
    useState<IProventoListPayloadApi>({ ativoId: "" });

  const filterForm = useForm<IProventoListPayloadApi>({
    defaultValues: { ativoId: proventoListPayload.ativoId },
  });

  const querygetProventos = useQuery({
    ...getQueryOptionsGetProventos(proventoListPayload),
  });

  const filterCount: number = proventoListPayload.ativoId === "" ? 0 : 1;

  const proventos = useMemo(() => {
    return querygetProventos.data;
  }, [querygetProventos.data]);

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

  function handleSubmitFilterForm(): void {
    filterForm.handleSubmit((data) => {
      setProventosListPayload({ ativoId: data.ativoId });
    })();
  }

  return {
    proventos,
    modalProventoState,
    filterForm,
    filterCount,
    closeModalProvento,
    handleEditProventos,
    handleDuplicarProvento,
    handleSubmitFilterForm,
    openModalProvento,
    setProventosListPayload,
  };
};
