import { useForm, UseFormReturn } from "react-hook-form";
import { useLoading } from "../../../../../../hooks/useLoading";
import { useNotification } from "../../../../../../hooks/useNotification";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { postConta } from "../../../../../../api/Contas/postConta";
import { IContaForm } from "../interfaces";
import { KEY_GET_CONTAS_PAGINADO } from "../../../../../../api/Contas/utils/queryOptionsGetContasPaginado";
import { Conta, ContaCreateAndUpdatePayload } from "@/types";

interface IUseModalContaProps {
  conta: Conta | undefined;
  onClose(): void;
}

interface IUseModalContaReturn {
  contaForm: UseFormReturn<IContaForm>;
  submitContaForm(): void;
}

export const useModalConta = ({
  conta,
  onClose,
}: IUseModalContaProps): IUseModalContaReturn => {
  const contaForm = useForm<IContaForm>();

  const loading = useLoading();

  const notification = useNotification();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (conta) {
      (Object.keys(conta) as (keyof Conta)[]).forEach((key) => {
        contaForm.setValue(
          key as keyof ContaCreateAndUpdatePayload,
          conta[key] as Conta[keyof Conta]
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conta]);

  function submitContaForm(): void {
    contaForm.handleSubmit(
      async (data) => {
        try {
          loading.setLoading(true);

          const payload: ContaCreateAndUpdatePayload = {
            id: data.id ?? undefined,
            nome: data.nome,
            tipoConta: data.tipoConta.id,
            agencia: data.agencia ?? "",
            conta: data.conta ?? "",
            observacao: data.observacao ?? "",
            incluirEmSomas: data.incluirEmSomas,
            ativo: true,
          };

          await postConta(payload);

          notification.showSnackBar(
            `Conta ${payload.id ? "editada" : "adicionada"} com sucesso!`,
            "success"
          );

          queryClient.invalidateQueries({
            queryKey: [KEY_GET_CONTAS_PAGINADO],
          });

          onClose();
        } catch (error) {
          console.error(error);
        } finally {
          loading.setLoading(false);
        }
      },
      () => {
        notification.showSnackBar(
          "Existem campos obrigatórios não preenchidos!",
          "error"
        );
      }
    )();
  }

  return {
    contaForm,
    submitContaForm,
  };
};
