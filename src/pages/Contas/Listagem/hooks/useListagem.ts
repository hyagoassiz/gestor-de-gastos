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
import useSearchBar from "../../../../hooks/useSearchBar";
import { ISeachBar } from "../../../../interfaces/ISearchBar";
import { Conta, ContaCreateAndUpdatePayload, ContaParams } from "@/types";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as PATHS from "@/routes/paths";

interface IUseListagemReturn {
  contas: IPaginatedResponse<Conta> | undefined;
  queryGetContasPaginado: UseQueryResult<IPaginatedResponse<Conta>>;
  filterForm: UseFormReturn<ContaCreateAndUpdatePayload>;
  filterCount: number;
  contaListPayload: ContaParams;
  searchBar: ISeachBar;
  handleAdicionarConta(): void;
  handleAtivarContaById(id: number): Promise<void>;
  handleChangePage(page: number, size?: number): void;
  handleEditarConta(contaId: string): void;
  handleInativarContaById(id: number): void;
  handleSubmitFilterForm(): void;
}

export const useListagem = (): IUseListagemReturn => {
  const loading = useLoading();

  const notification = useNotification();

  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const filterForm = useForm<ContaCreateAndUpdatePayload>();

  const { textoBusca, searchBar } = useSearchBar({});

  const [contaListPayload, setContaListPayload] = useState<ContaParams>({
    ativo: true,
    page: 0,
    size: 10,
  });

  const queryGetContasPaginado = useQuery({
    ...queryOptionsGetContasPaginado({ ...contaListPayload, textoBusca }),
  });

  const filterCount: number = contaListPayload.ativo === true ? 0 : 1;

  const contas = queryGetContasPaginado.data;

  useEffect(() => {
    loading.setLoading(queryGetContasPaginado.isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryGetContasPaginado.isLoading]);

  async function handleAtivarContaById(id: number): Promise<void> {
    try {
      loading.setLoading(true);

      await updateStatusConta({ id, ativo: true });

      queryClient.invalidateQueries({ queryKey: [KEY_GET_CONTAS_PAGINADO] });

      notification.showSnackBar("Conta ativada com sucesso!", "success");
    } catch (error) {
      console.error(error);
    } finally {
      loading.setLoading(false);
    }
  }

  function handleChangePage(page: number, size?: number): void {
    setContaListPayload((prev) => ({
      ...prev,
      page: page,
      size: size ?? prev.size,
    }));
  }

  function handleEditarConta(contaId: string): void {
    navigate(PATHS.CONTAS.EDIT.replace(":id", contaId));
  }

  function handleAdicionarConta(): void {
    navigate(PATHS.CONTAS.CREATE);
  }

  async function handleInativarContaById(id: number): Promise<void> {
    try {
      loading.setLoading(true);

      await updateStatusConta({ id, ativo: false });

      queryClient.invalidateQueries({ queryKey: [KEY_GET_CONTAS_PAGINADO] });

      notification.showSnackBar("Conta inativada com sucesso!", "success");
    } catch (error) {
      console.error(error);
    } finally {
      loading.setLoading(false);
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
    contas,
    queryGetContasPaginado,
    filterForm,
    filterCount,
    contaListPayload,
    searchBar,
    handleAdicionarConta,
    handleAtivarContaById,
    handleChangePage,
    handleEditarConta,
    handleInativarContaById,
    handleSubmitFilterForm,
  };
};
