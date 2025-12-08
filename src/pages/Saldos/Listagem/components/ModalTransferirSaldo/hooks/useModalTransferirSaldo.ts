import { Conta, TransferirSaldoPayload } from "@/types";
import { useForm, UseFormReturn } from "react-hook-form";
import { ModalTransferirSaldoForm } from "../types";
import { useNotification } from "@/hooks/useNotification";
import { useMutationTransferirSaldo } from "@/services/contas/contas.hooks";
import { useQueryListarContas } from "@/services/contas/hooks/useQueryListarContas";

interface UseModalTransferirSaldoProps {
  onClose(): void;
}

interface UseModalTransferirSaldoReturn {
  contasDestino: Conta[] | undefined;
  contasOrigem: Conta[] | undefined;
  modalTransferirSaldoForm: UseFormReturn<ModalTransferirSaldoForm>;
  handleContaOrigemChange(contaOrigem: Conta): void;
  handleTransferirSaldo(): void;
}

const useModalTransferirSaldo = ({
  onClose,
}: UseModalTransferirSaldoProps): UseModalTransferirSaldoReturn => {
  const modalTransferirSaldoForm = useForm<ModalTransferirSaldoForm>();

  const notification = useNotification();

  const queryListarContas = useQueryListarContas({ ativo: true });

  const mutationTransferirSaldo = useMutationTransferirSaldo({
    onSuccess: () => {
      onClose();
    },
  });

  const contasDestino = queryListarContas.data?.filter(
    (conta) => conta.id !== modalTransferirSaldoForm.watch("contaOrigem")?.id
  );

  const contasOrigem = queryListarContas.data;

  function handleContaOrigemChange(contaOrigem: Conta): void {
    modalTransferirSaldoForm.setValue("contaOrigem", contaOrigem);

    if (modalTransferirSaldoForm.formState.errors.contaOrigem) {
      modalTransferirSaldoForm.clearErrors("contaOrigem");
    }

    if (
      modalTransferirSaldoForm.getValues("contaDestino")?.id === contaOrigem.id
    ) {
      modalTransferirSaldoForm.setValue("contaDestino", null);
    }
  }

  function handleTransferirSaldo(): void {
    modalTransferirSaldoForm.handleSubmit(
      (data) => {
        const payload: TransferirSaldoPayload = {
          contaOrigemId: data.contaOrigem.id,
          contaDestinoId: data.contaDestino.id,
          valor: data.valor,
        };
        mutationTransferirSaldo.mutate(payload);
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
    contasDestino,
    contasOrigem,
    modalTransferirSaldoForm,
    handleContaOrigemChange,
    handleTransferirSaldo,
  };
};

export default useModalTransferirSaldo;
