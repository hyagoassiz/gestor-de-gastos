import { useEffect } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  Categoria,
  CategoriaParamsPaginado,
  PaginatedResponse,
  SearchBar,
} from "@/types";
import { useNavigate } from "react-router-dom";
import * as PATHS from "@/routes/paths";
import useSearchBar from "@/hooks/useSearchBar";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useMutationAtualizarStatusCategoria } from "@/services/categorias/categorias.hooks";
import { useQueryListarCategoriasPaginado } from "@/services/categorias/hooks/useQueryListarCategoriasPaginado";

interface UseListagemReturn {
  categorias: PaginatedResponse<Categoria> | undefined;
  filterForm: UseFormReturn<CategoriaParamsPaginado>;
  queryListarCategoriasPaginado: UseQueryResult<PaginatedResponse<Categoria>>;
  searchBar: SearchBar;
  handleAdicionarCategoria(): void;
  handleAtivarCategoriaById(id: number): void;
  handleEditarCategoria(id: number): void;
  handleInativarCategoriaById(id: number): void;
}

export const useListagem = (): UseListagemReturn => {
  const { setLoading } = useLoading();

  const filterForm = useForm<CategoriaParamsPaginado>();

  const navigate = useNavigate();

  const { searchBar } = useSearchBar({});

  const { getBackendPage, getParam, getSearchString } = useUrlParams();

  const mutationAtualizarStatusCategoria =
    useMutationAtualizarStatusCategoria();

  const queryListarCategoriasPaginado = useQueryListarCategoriasPaginado({
    page: getBackendPage(),
    tipoMovimentacao: getParam("tipoMovimentacao"),
    ativo: getParam("ativo") === "false" ? false : true,
    textoBusca: getParam("textoBusca"),
    size: 10,
    padrao: false,
  });

  const categorias = queryListarCategoriasPaginado.data;

  useEffect(() => {
    const { isFetching, isPlaceholderData } = queryListarCategoriasPaginado;
    setLoading(isFetching && isPlaceholderData);
  }, [queryListarCategoriasPaginado.isLoading]);

  function handleAdicionarCategoria(): void {
    navigate(PATHS.CATEGORIAS.CREATE);
  }

  function handleAtivarCategoriaById(id: number): void {
    mutationAtualizarStatusCategoria.mutate({ id: id, ativo: true });
  }

  function handleEditarCategoria(id: number): void {
    const search = getSearchString();
    navigate(`${PATHS.CATEGORIAS.EDIT.replace(":id", String(id))}${search}`);
  }

  function handleInativarCategoriaById(id: number): void {
    mutationAtualizarStatusCategoria.mutate({ id: id, ativo: false });
  }

  return {
    categorias,
    filterForm,
    queryListarCategoriasPaginado,
    searchBar,
    handleAdicionarCategoria,
    handleAtivarCategoriaById,
    handleEditarCategoria,
    handleInativarCategoriaById,
  };
};
