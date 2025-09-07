import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import { useNotification } from "../../../../hooks/useNotification";
import { useForm, UseFormReturn } from "react-hook-form";
import { IModalCategoriaState } from "../interfaces";
import { updateStatusCategoria } from "../../../../api/Categorias/updateStatusCategoria";
import {
  KEY_GET_CATEGORIAS_PAGINADO,
  queryOptionsGetCategoriasPaginado,
} from "../../../../api/Categorias/utils/queryOptionsGetCategoriasPaginado";

interface IUseListagemReturn {
  categorias: IPaginatedResponse<ICategoriaApi> | undefined;
  modalCategoriaState: IModalCategoriaState;
  filterForm: UseFormReturn<ICategoriaListPayloadApi>;
  filterCount: number;
  categoriaListPayload: ICategoriaListPayloadApi;
  closeModalCategoria(): void;
  handleAtivarCategoriaById(id: number): Promise<void>;
  handleChangePage(page: number, size?: number): void;
  handleEditarCategoria(categoria: ICategoriaApi): void;
  handleInativarCategoriaById(id: number): void;
  handleSubmitFilterForm(): void;
  openModalCategoria(): void;
}

export const useListagem = (): IUseListagemReturn => {
  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryClient = useQueryClient();

  const filterForm = useForm<ICategoriaListPayloadApi>();

  const [modalCategoriaState, setModalCategoriaState] =
    useState<IModalCategoriaState>({
      categoria: undefined,
      open: false,
    });
  const [categoriaListPayload, setCategoriaListPayload] =
    useState<ICategoriaListPayloadApi>({ ativo: true, page: 0, size: 10 });

  const { data: categorias, isFetching } = useQuery({
    ...queryOptionsGetCategoriasPaginado(categoriaListPayload),
  });

  const filterCount: number = categoriaListPayload.ativo === true ? 0 : 1;

  useEffect(() => {
    setLoading(isFetching);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  function closeModalCategoria(): void {
    setModalCategoriaState({ open: false, categoria: undefined });
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
      showSnackBar(String(error), "error");
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

  function handleEditarCategoria(categoria: ICategoriaApi): void {
    setModalCategoriaState({ open: true, categoria });
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
      showSnackBar(String(error), "error");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmitFilterForm(): void {
    filterForm.handleSubmit((data) => {
      setCategoriaListPayload({ ativo: !data.ativo });
    })();
  }

  function openModalCategoria(): void {
    setModalCategoriaState({ open: true, categoria: undefined });
  }

  return {
    categorias,
    modalCategoriaState,
    filterForm,
    filterCount,
    categoriaListPayload,
    closeModalCategoria,
    handleAtivarCategoriaById,
    handleChangePage,
    handleEditarCategoria,
    handleInativarCategoriaById,
    handleSubmitFilterForm,
    openModalCategoria,
  };
};
