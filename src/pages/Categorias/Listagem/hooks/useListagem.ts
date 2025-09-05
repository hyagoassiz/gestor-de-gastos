import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import { useNotification } from "../../../../hooks/useNotification";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  KEY_GET_CATEGORIAS,
  queryOptionsGetCategorias,
} from "../../../../api/Categorias/utils/queryOptionsGetCategorias";
import { IModalCategoriaState } from "../interfaces";
import { updateStatusCategoria } from "../../../../api/Categorias/updateStatusCategoria";

interface IUseListagemReturn {
  categorias: ICategoriaApi[] | undefined;
  modalCategoriaState: IModalCategoriaState;
  filterForm: UseFormReturn<ICategoriaListPayloadApi>;
  filterCount: number;
  categoriaListPayload: ICategoriaListPayloadApi;
  closeModalCategoria(): void;
  handleAtivarCategoriaById(id: string): Promise<void>;
  handleEditarCategoria(categoria: ICategoriaApi): void;
  handleInativarCategoriaById(id: string): void;
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
    useState<ICategoriaListPayloadApi>({ ativo: true });

  const { data: categorias, isFetching } = useQuery({
    ...queryOptionsGetCategorias(categoriaListPayload),
  });

  const filterCount: number = categoriaListPayload.ativo === true ? 0 : 1;

  useEffect(() => {
    setLoading(isFetching);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  function closeModalCategoria(): void {
    setModalCategoriaState({ open: false, categoria: undefined });
  }

  async function handleAtivarCategoriaById(id: string): Promise<void> {
    try {
      setLoading(true);

      await updateStatusCategoria({ id, ativo: true });

      queryClient.invalidateQueries({ queryKey: [KEY_GET_CATEGORIAS] });

      showSnackBar("Categoria ativada com sucesso!", "success");
    } catch (error) {
      console.error(error);
      showSnackBar(String(error), "error");
    } finally {
      setLoading(false);
    }
  }

  function handleEditarCategoria(categoria: ICategoriaApi): void {
    setModalCategoriaState({ open: true, categoria });
  }

  async function handleInativarCategoriaById(id: string): Promise<void> {
    try {
      setLoading(true);

      await updateStatusCategoria({ id, ativo: false });

      queryClient.invalidateQueries({ queryKey: [KEY_GET_CATEGORIAS] });

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
    handleEditarCategoria,
    handleInativarCategoriaById,
    handleSubmitFilterForm,
    openModalCategoria,
  };
};
