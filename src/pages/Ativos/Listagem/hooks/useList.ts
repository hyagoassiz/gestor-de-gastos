import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import {
  getQueryOptionsGetAtivos,
  KEY_GET_ATIVOS,
} from "../../../../api/Ativos/utils/getQueryOptionsGetAtivos";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IModalAtivoState, IModalInativarState } from "../interfaces";
import { useLoading } from "../../../../hooks/useLoading";
import { updateAtivoStatus } from "../../../../api/Ativos/updateAtivoStatus";
import { useNotification } from "../../../../hooks/useNotification";
import { useForm, UseFormReturn } from "react-hook-form";

interface IUseList {
  ativos: IAtivoResponseApi[] | undefined;
  modalAtivoState: IModalAtivoState;
  modalInativarState: IModalInativarState;
  filterForm: UseFormReturn<IAtivoListPayloadApi>;
  filterCount: number;
  closeModalAtivo(): void;
  closeModalInativar(): void;
  handleAtivarAtivo(ativo: IAtivoResponseApi): Promise<void>;
  handleInativarAtivo(ativo: IAtivoResponseApi): void;
  handleEditarAtivo(ativo: IAtivoResponseApi): void;
  handleSubmitFilterForm(): void;
  openModalAtivo(): void;
  setAtivoListPayload: Dispatch<SetStateAction<IAtivoListPayloadApi>>;
}

export const useList = (): IUseList => {
  const [modalAtivoState, setAtivoModalState] = useState<IModalAtivoState>({
    ativo: null,
    open: false,
  });

  const [modalInativarState, setModalInativarState] =
    useState<IModalInativarState>({
      ativo: null,
      open: false,
    });

  const [ativoListPayload, setAtivoListPayload] =
    useState<IAtivoListPayloadApi>({ ativo: true });

  const filterForm = useForm<IAtivoListPayloadApi>({
    defaultValues: { ativo: !ativoListPayload.ativo },
  });

  const queryGetAtivos = useQuery({
    ...getQueryOptionsGetAtivos(ativoListPayload),
  });

  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryClient = useQueryClient();

  const filterCount: number = ativoListPayload.ativo === true ? 0 : 1;

  const ativos = useMemo(() => {
    return queryGetAtivos.data;
  }, [queryGetAtivos.data]);

  useEffect(() => {
    setLoading(queryGetAtivos.isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryGetAtivos.isLoading]);

  function openModalAtivo(): void {
    setAtivoModalState({ ativo: null, open: true });
  }

  function closeModalAtivo(): void {
    setAtivoModalState({ ativo: null, open: false });
  }

  function closeModalInativar(): void {
    setModalInativarState({ ativo: null, open: false });
  }

  async function handleAtivarAtivo(ativo: IAtivoResponseApi): Promise<void> {
    try {
      setLoading(true);

      await updateAtivoStatus({ id: ativo?.id, ativo: true });

      queryClient.invalidateQueries({ queryKey: [KEY_GET_ATIVOS] });

      showSnackBar("Ativo ativado com sucesso!", "success");
    } catch (error) {
      console.error(error);
      showSnackBar(String(error), "error");
    } finally {
      setLoading(false);
    }
  }

  function handleInativarAtivo(ativo: IAtivoResponseApi): void {
    setModalInativarState({ ativo, open: true });
  }

  function handleEditarAtivo(ativo: IAtivoResponseApi): void {
    setAtivoModalState({ ativo, open: true });
  }

  function handleSubmitFilterForm(): void {
    filterForm.handleSubmit((data) => {
      setAtivoListPayload({ ativo: !data.ativo });
    })();
  }

  return {
    ativos,
    modalAtivoState,
    modalInativarState,
    filterForm,
    filterCount,
    closeModalAtivo,
    closeModalInativar,
    handleAtivarAtivo,
    handleEditarAtivo,
    handleInativarAtivo,
    handleSubmitFilterForm,
    openModalAtivo,
    setAtivoListPayload,
  };
};
