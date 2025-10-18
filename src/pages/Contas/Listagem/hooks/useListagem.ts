import { useEffect } from "react";
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
import { Conta, ContaCreateAndUpdatePayload } from "@/types";
import { useNavigate } from "react-router-dom";
import * as PATHS from "@/routes/paths";
import { useUrlParams } from "@/hooks/useUrlParams";

interface IUseListagemReturn {
  contas: IPaginatedResponse<Conta> | undefined;
  queryGetContasPaginado: UseQueryResult<IPaginatedResponse<Conta>>;
  filterForm: UseFormReturn<ContaCreateAndUpdatePayload>;
  searchBar: ISeachBar;
  handleAdicionarConta(): void;
  handleAtivarContaById(id: number): Promise<void>;
  handleEditarConta(contaId: string): void;
  handleInativarContaById(id: number): void;
  handleSubmitFilterForm(): void;
}

export const useListagem = (): IUseListagemReturn => {
  const loading = useLoading();

  const notification = useNotification();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { searchBar } = useSearchBar({});

  const { getBackendPage, setParams, getParam } = useUrlParams();

  const filterForm = useForm<ContaCreateAndUpdatePayload>();

  const queryGetContasPaginado = useQuery({
    ...queryOptionsGetContasPaginado({
      page: getBackendPage(),
      ativo: getParam("ativo"),
      incluirEmSomas: getParam("incluirEmSomas"),
      textoBusca: getParam("textoBusca"),
      tipoConta: getParam("tipoConta"),
      size: 10,
    }),
  });

  const contas = queryGetContasPaginado.data;

  useEffect(() => {
    loading.setLoading(queryGetContasPaginado.isLoading);
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
      setParams({
        pagina: 0,
        tipoConta: data.tipoConta,
        incluirEmSomas: data.incluirEmSomas,
        ativo: !data.ativo,
      });
    })();
  }

  return {
    contas,
    queryGetContasPaginado,
    filterForm,
    searchBar,
    handleAdicionarConta,
    handleAtivarContaById,
    handleEditarConta,
    handleInativarContaById,
    handleSubmitFilterForm,
  };
};
