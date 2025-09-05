import { useForm, UseFormReturn } from "react-hook-form";
import { useLoading } from "../../../../../../hooks/useLoading";
import { useNotification } from "../../../../../../hooks/useNotification";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ICategoriaForm } from "../interfaces";
import { postCategoria } from "../../../../../../api/Categorias/postCategoria";
import { KEY_GET_CATEGORIAS } from "../../../../../../api/Categorias/utils/queryOptionsGetCategorias";

interface IUseModalCategoria {
  categoria: ICategoriaApi | undefined;
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
      (Object.keys(categoria) as (keyof ICategoriaApi)[]).forEach((key) => {
        contaForm.setValue(
          key as keyof ICategoriaPayloadApi,
          categoria[key] as ICategoriaApi[keyof ICategoriaApi]
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

          const now = dayjs().toISOString();

          const payload: ICategoriaPayloadApi = {
            ...data,
            id: data.id ?? undefined,
            tipo: data.tipo.id,
            observacao: data.observacao ?? "",
            criadoEm: data.criadoEm ?? now,
            atualizadoEm: data.id ? now : "",
            ativo: true,
          };

          await postCategoria(payload);

          showSnackBar(
            `Categoria ${payload.id ? "editada" : "adicionada"} com sucesso!`,
            "success"
          );

          queryClient.invalidateQueries({ queryKey: [KEY_GET_CATEGORIAS] });

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
