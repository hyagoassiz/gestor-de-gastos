import { useForm, UseFormReturn } from "react-hook-form";
import { ModalAjustarSaldoState } from "../../../types";
import { AjustarSaldoForm } from "../types";
import { useMutationAjustarSaldoConta } from "@/services/contas/contas.hooks";
import { useNotification } from "@/hooks/useNotification";
import { AjustarSaldoContaPayload } from "@/types";

interface UseModalAjustarSaldoProps {
  modalAjustarSaldoState: ModalAjustarSaldoState;
  onClose(): void;
}

interface UseModalAjustarSaldoReturn {
  ajustarSaldoForm: UseFormReturn<AjustarSaldoForm>;
  handleAjustarSaldo(): void;
}

const useModalAjustarSaldo = ({
  modalAjustarSaldoState,
  onClose,
}: UseModalAjustarSaldoProps): UseModalAjustarSaldoReturn => {
  const notification = useNotification();

  const ajustarSaldoForm = useForm<AjustarSaldoForm>({
    defaultValues: {
      valorAtual: modalAjustarSaldoState.valorAtual,
      conta: modalAjustarSaldoState.conta,
    },
  });

  const mutationAjustarSaldoConta = useMutationAjustarSaldoConta({
    onSuccess: () => onClose(),
  });

  function handleAjustarSaldo(): void {
    ajustarSaldoForm.handleSubmit(
      (data) => {
        const payload: AjustarSaldoContaPayload = {
          contaId: data.conta?.id as number,
          valor: data.valorAtual,
        };

        mutationAjustarSaldoConta.mutate(payload);
      },
      () => {
        notification.showSnackBar(
          "Existem campos obrigatórios não preenchidos!",
          "error"
        );
      }
    )();
  }

  return { ajustarSaldoForm, handleAjustarSaldo };
};

export default useModalAjustarSaldo;
