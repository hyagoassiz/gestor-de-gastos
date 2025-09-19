import { useEffect, useState } from "react";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import { useNotification } from "../../../../hooks/useNotification";
import { updateStatusConta } from "../../../../api/Contas/updateStatusConta";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  KEY_GET_CONTAS_PAGINADO,
  queryOptionsGetContasPaginado,
} from "../../../../api/Contas/utils/queryOptionsGetContasPaginado";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";

interface IUseListagemReturn {
  queryGetContasPaginado: UseQueryResult<IPaginatedResponse<IContaApi>>;
  filterForm: UseFormReturn<IContaListPayloadApi>;
  filterCount: number;
  contaListPayload: IContaListPayloadApi;
  handleAdicionarTransacao(): void;
  handleAtivarContaById(id: number): Promise<void>;
  handleChangePage(page: number, size?: number): void;
  handleInativarContaById(id: number): void;
  handleSubmitFilterForm(): void;
}

export const useListagem = (): IUseListagemReturn => {
  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const filterForm = useForm<IContaListPayloadApi>();

  const [contaListPayload, setContaListPayload] =
    useState<IContaListPayloadApi>({ ativo: true, page: 0, size: 10 });

  const queryGetContasPaginado = useQuery({
    ...queryOptionsGetContasPaginado(contaListPayload),
  });

  const filterCount: number = contaListPayload.ativo === true ? 0 : 1;

  useEffect(() => {
    setLoading(queryGetContasPaginado.isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryGetContasPaginado.isLoading]);

  function handleAdicionarTransacao(): void {
    navigate(PATHS.TRANSACOES.LIST);
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

  function handleChangePage(page: number, size?: number): void {
    setContaListPayload((prev) => ({
      ...prev,
      page: page,
      size: size ?? prev.size,
    }));
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
      setContaListPayload((prevState) => ({
        ...prevState,
        ativo: !data.ativo,
        page: 0,
      }));
    })();
  }

  return {
    queryGetContasPaginado,
    filterForm,
    filterCount,
    contaListPayload,
    handleAdicionarTransacao,
    handleAtivarContaById,
    handleChangePage,
    handleInativarContaById,
    handleSubmitFilterForm,
  };
};
