import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IModalContaState } from "../interfaces";
import { useLoading } from "../../../../hooks/useLoading";
import { useNotification } from "../../../../hooks/useNotification";
import { updateStatusConta } from "../../../../api/Contas/updateStatusConta";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  KEY_GET_CONTAS_PAGINADO,
  queryOptionsGetContasPaginado,
} from "../../../../api/Contas/utils/queryOptionsGetContasPaginado";

interface IUseListagemReturn {
  contas: IPaginatedResponse<IContaApi> | undefined;
  modalContaState: IModalContaState;
  filterForm: UseFormReturn<IContaListPayloadApi>;
  filterCount: number;
  contaListPayload: IContaListPayloadApi;
  closeModalConta(): void;
  handleAtivarContaById(id: number): Promise<void>;
  handleEditarConta(conta: IContaApi): void;
  handleInativarContaById(id: number): void;
  handleSubmitFilterForm(): void;
  openModalConta(): void;
}

export const useListagem = (): IUseListagemReturn => {
  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryClient = useQueryClient();

  const filterForm = useForm<IContaListPayloadApi>();

  const [modalContaState, setModalContaState] = useState<IModalContaState>({
    conta: undefined,
    open: false,
  });
  const [contaListPayload, setContaListPayload] =
    useState<IContaListPayloadApi>({ ativo: true, page: 0, size: 10 });

  const { data: contas, isFetching } = useQuery({
    ...queryOptionsGetContasPaginado(contaListPayload),
  });

  const filterCount: number = contaListPayload.ativo === true ? 0 : 1;

  useEffect(() => {
    setLoading(isFetching);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  function closeModalConta(): void {
    setModalContaState({ open: false, conta: undefined });
  }

  async function handleAtivarContaById(id: number): Promise<void> {
    try {
      setLoading(true);

      await updateStatusConta({ id, ativo: true });

      queryClient.invalidateQueries({ queryKey: [KEY_GET_CONTAS_PAGINADO] });

      showSnackBar("Conta ativada com sucesso!", "success");
    } catch (error) {
      console.error(error);
      showSnackBar(String(error), "error");
    } finally {
      setLoading(false);
    }
  }

  function handleEditarConta(conta: IContaApi): void {
    setModalContaState({ open: true, conta });
  }

  async function handleInativarContaById(id: number): Promise<void> {
    try {
      setLoading(true);

      await updateStatusConta({ id, ativo: false });

      queryClient.invalidateQueries({ queryKey: [KEY_GET_CONTAS_PAGINADO] });

      showSnackBar("Conta inativada com sucesso!", "success");
    } catch (error) {
      console.error(error);
      showSnackBar(String(error), "error");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmitFilterForm(): void {
    filterForm.handleSubmit((data) => {
      setContaListPayload({ ativo: !data.ativo });
    })();
  }

  function openModalConta(): void {
    setModalContaState({ open: true, conta: undefined });
  }

  return {
    contas,
    modalContaState,
    filterForm,
    filterCount,
    contaListPayload,
    closeModalConta,
    handleAtivarContaById,
    handleEditarConta,
    handleInativarContaById,
    handleSubmitFilterForm,
    openModalConta,
  };
};
