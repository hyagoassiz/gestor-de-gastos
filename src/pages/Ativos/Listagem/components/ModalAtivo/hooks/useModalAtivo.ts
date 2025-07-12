import { useForm, UseFormReturn } from "react-hook-form";
import { useLoading } from "../../../../../../hooks/useLoading";
import { useNotification } from "../../../../../../hooks/useNotification";
import dayjs from "dayjs";
import { postAtivo } from "../../../../../../api/Ativos/postAtivo";
import { useEffect } from "react";
import { KEY_GET_ATIVOS } from "../../../../../../api/Ativos/utils/getQueryOptionsGetAtivos";
import { useQueryClient } from "@tanstack/react-query";

interface IUseModalAtivoProps {
  ativo: IAtivoResponseApi | null;
  onClose(): void;
}

interface IUseModalAtivoReturn {
  ativoForm: UseFormReturn<IAtivoPayloadApi>;
  submitAtivoForm(): void;
}

export const useModalAtivo = ({
  ativo,
  onClose,
}: IUseModalAtivoProps): IUseModalAtivoReturn => {
  const ativoForm = useForm<IAtivoPayloadApi>();

  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (ativo) {
      (Object.keys(ativo) as (keyof IAtivoResponseApi)[]).forEach((key) => {
        ativoForm.setValue(
          key as keyof IAtivoPayloadApi,
          ativo[key] as IAtivoResponseApi[keyof IAtivoResponseApi]
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ativo]);

  function submitAtivoForm(): void {
    ativoForm.handleSubmit(
      async (data) => {
        try {
          setLoading(true);

          const now = dayjs().toISOString();

          const payload: IAtivoPayloadApi = {
            ...data,
            id: data.id ?? undefined,
            observacao: data.observacao ?? "",
            createdAt: data.createdAt ?? now,
            updatedAt: data.id ? now : "",
          };

          await postAtivo(payload);

          showSnackBar(
            `Ativo ${payload.id ? "editado" : "adicionado"} com sucesso!`,
            "success"
          );

          queryClient.invalidateQueries({ queryKey: [KEY_GET_ATIVOS] });

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
    ativoForm,
    submitAtivoForm,
  };
};
