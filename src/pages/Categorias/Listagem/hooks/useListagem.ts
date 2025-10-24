import { useEffect } from "react";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import { useNotification } from "../../../../hooks/useNotification";
import { useForm, UseFormReturn } from "react-hook-form";
import { updateStatusCategoria } from "../../../../api/Categorias/updateStatusCategoria";
import {
  KEY_GET_CATEGORIAS_PAGINADO,
  queryOptionsGetCategoriasPaginado,
} from "../../../../api/Categorias/utils/queryOptionsGetCategoriasPaginado";
import { Categoria, CategoriaParamsPaginado } from "@/types";
import { useNavigate } from "react-router-dom";
import * as PATHS from "@/routes/paths";
import useSearchBar from "@/hooks/useSearchBar";
import { ISeachBar } from "@/interfaces/ISearchBar";
import { useUrlParams } from "@/hooks/useUrlParams";

interface IUseListagemReturn {
  categorias: IPaginatedResponse<Categoria> | undefined;
  filterForm: UseFormReturn<CategoriaParamsPaginado>;
  queryGetCategoriasPaginado: UseQueryResult<IPaginatedResponse<Categoria>>;
  searchBar: ISeachBar;
  handleAdicionarCategoria(): void;
  handleAtivarCategoriaById(id: number): Promise<void>;
  handleEditarCategoria(categoriaId: string): void;
  handleInativarCategoriaById(id: number): void;
}

export const useListagem = (): IUseListagemReturn => {
  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryClient = useQueryClient();

  const filterForm = useForm<CategoriaParamsPaginado>();

  const navigate = useNavigate();

  const { searchBar } = useSearchBar({});

  const { getBackendPage, getParam, getSearchString } = useUrlParams();

  const queryGetCategoriasPaginado = useQuery({
    ...queryOptionsGetCategoriasPaginado({
      page: getBackendPage(),
      tipoMovimentacao: getParam("tipoMovimentacao"),
      ativo: getParam("ativo") === "false" ? false : true,
      textoBusca: getParam("textoBusca"),
      size: 10,
      padrao: false,
    }),
  });

  const categorias = queryGetCategoriasPaginado.data;

  useEffect(() => {
    setLoading(queryGetCategoriasPaginado.isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryGetCategoriasPaginado.isLoading]);

  function handleAdicionarCategoria(): void {
    navigate(PATHS.CATEGORIAS.CREATE);
  }

  async function handleAtivarCategoriaById(id: number): Promise<void> {
    try {
      setLoading(true);

      await updateStatusCategoria({ id, ativo: true });

      queryClient.invalidateQueries({
        queryKey: [KEY_GET_CATEGORIAS_PAGINADO],
      });

      showSnackBar("Categoria ativada com sucesso!", "success");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleEditarCategoria(categoriaId: string): void {
    const search = getSearchString();
    navigate(`${PATHS.CATEGORIAS.EDIT.replace(":id", categoriaId)}${search}`);
  }

  async function handleInativarCategoriaById(id: number): Promise<void> {
    try {
      setLoading(true);

      await updateStatusCategoria({ id, ativo: false });

      queryClient.invalidateQueries({
        queryKey: [KEY_GET_CATEGORIAS_PAGINADO],
      });

      showSnackBar("Categoria inativada com sucesso!", "success");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    categorias,
    filterForm,
    queryGetCategoriasPaginado,
    searchBar,
    handleAdicionarCategoria,
    handleAtivarCategoriaById,
    handleEditarCategoria,
    handleInativarCategoriaById,
  };
};
