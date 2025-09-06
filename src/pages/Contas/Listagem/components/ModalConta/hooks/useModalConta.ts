import { useForm, UseFormReturn } from "react-hook-form";
import { useLoading } from "../../../../../../hooks/useLoading";
import { useNotification } from "../../../../../../hooks/useNotification";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { postConta } from "../../../../../../api/Contas/postConta";
import { KEY_GET_CONTAS } from "../../../../../../api/Contas/utils/queryOptionsGetContas";
import { IContaForm } from "../interfaces";

interface IUseModalContaProps {
  conta: IContaApi | undefined;
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

  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (conta) {
      (Object.keys(conta) as (keyof IContaApi)[]).forEach((key) => {
        contaForm.setValue(
          key as keyof IContaPayloadApi,
          conta[key] as IContaApi[keyof IContaApi]
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conta]);

  function submitContaForm(): void {
    contaForm.handleSubmit(
      async (data) => {
        try {
          setLoading(true);

          const payload: IContaPayloadApi = {
            ...data,
            id: data.id ?? undefined,
            tipoConta: data.tipo.id,
            agencia: data.agencia ?? "",
            conta: data.conta ?? "",
            observacao: data.observacao ?? "",
            ativo: true,
          };

          await postConta(payload);

          showSnackBar(
            `Conta ${payload.id ? "editada" : "adicionada"} com sucesso!`,
            "success"
          );

          queryClient.invalidateQueries({ queryKey: [KEY_GET_CONTAS] });

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
