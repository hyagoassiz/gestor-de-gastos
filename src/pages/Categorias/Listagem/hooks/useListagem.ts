import { useEffect, useState } from "react";
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

interface IUseListagemReturn {
  categorias: IPaginatedResponse<Categoria> | undefined;
  filterForm: UseFormReturn<CategoriaParamsPaginado>;
  filterCount: number;
  categoriaListPayload: CategoriaParamsPaginado;
  queryGetCategoriasPaginado: UseQueryResult<IPaginatedResponse<Categoria>>;
  searchBar: ISeachBar;
  handleAdicionarCategoria(): void;
  handleAtivarCategoriaById(id: number): Promise<void>;
  handleChangePage(page: number, size?: number): void;
  handleEditarCategoria(categoriaId: string): void;
  handleInativarCategoriaById(id: number): void;
  handleSubmitFilterForm(): void;
}

export const useListagem = (): IUseListagemReturn => {
  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryClient = useQueryClient();

  const filterForm = useForm<CategoriaParamsPaginado>();

  const navigate = useNavigate();

  const { textoBusca, searchBar } = useSearchBar({});

  const [categoriaListPayload, setCategoriaListPayload] =
    useState<CategoriaParamsPaginado>({ ativo: true, page: 0, size: 10 });

  const queryGetCategoriasPaginado = useQuery({
    ...queryOptionsGetCategoriasPaginado({
      ...categoriaListPayload,
      textoBusca,
    }),
  });

  const filterCount: number = categoriaListPayload.ativo === true ? 0 : 1;

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

  function handleChangePage(page: number, size?: number): void {
    setCategoriaListPayload((prev) => ({
      ...prev,
      page: page,
      size: size ?? prev.size,
    }));
  }

  function handleEditarCategoria(categoriaId: string): void {
    navigate(PATHS.CATEGORIAS.EDIT.replace(":id", categoriaId));
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

  function handleSubmitFilterForm(): void {
    filterForm.handleSubmit((data) => {
      setCategoriaListPayload((prevState) => ({
        ...prevState,
        ativo: !data.ativo,
        page: 0,
      }));
    })();
  }

  return {
    categorias,
    filterForm,
    filterCount,
    categoriaListPayload,
    queryGetCategoriasPaginado,
    searchBar,
    handleAdicionarCategoria,
    handleAtivarCategoriaById,
    handleChangePage,
    handleEditarCategoria,
    handleInativarCategoriaById,
    handleSubmitFilterForm,
  };
};
