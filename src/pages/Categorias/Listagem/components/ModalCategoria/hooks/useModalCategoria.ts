import { useForm, UseFormReturn } from "react-hook-form";
import { useLoading } from "../../../../../../hooks/useLoading";
import { useNotification } from "../../../../../../hooks/useNotification";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ICategoriaForm } from "../interfaces";
import { postCategoria } from "../../../../../../api/Categorias/postCategoria";
import { KEY_GET_CATEGORIAS_PAGINADO } from "../../../../../../api/Categorias/utils/queryOptionsGetCategoriasPaginado";
import { Categoria, CategoriaCreateAndUpdatePayload } from "@/types";

interface IUseModalCategoria {
  categoria: Categoria | undefined;
  onClose(): void;
}

interface IUseModalContaReturn {
  contaForm: UseFormReturn<ICategoriaForm>;
  submitContaForm(): void;
}

export const useModalCategoria = ({
  categoria,
  onClose,
}: IUseModalCategoria): IUseModalContaReturn => {
  const contaForm = useForm<ICategoriaForm>();

  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (categoria) {
      (Object.keys(categoria) as (keyof Categoria)[]).forEach((key) => {
        contaForm.setValue(
          key as keyof CategoriaCreateAndUpdatePayload,
          categoria[key] as Categoria[keyof Categoria]
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoria]);

  function submitContaForm(): void {
    contaForm.handleSubmit(
      async (data) => {
        try {
          setLoading(true);

          const payload: CategoriaCreateAndUpdatePayload = {
            ...data,
            id: data.id ?? undefined,
            tipoMovimentacao: data.tipoMovimentacao.id,
            observacao: data.observacao ?? "",
            ativo: true,
          };

          await postCategoria(payload);

          showSnackBar(
            `Categoria ${payload.id ? "editada" : "adicionada"} com sucesso!`,
            "success"
          );

          queryClient.invalidateQueries({
            queryKey: [KEY_GET_CATEGORIAS_PAGINADO],
          });

          onClose();
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      },
      () => {
        showSnackBar("Existem campos obrigatórios não preenchidos!", "error");
      }
    )();
  }

  return {
    contaForm,
    submitContaForm,
  };
};
