import { postTransferir } from "@/api/Saldos/postTransferir";
import { useLoading } from "@/hooks/useLoading";
import { Conta } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, UseFormReturn } from "react-hook-form";
import { ModalTransferirSaldoForm } from "../types";
import { KEY_GET_SALDOS_CONTAS } from "@/api/Saldos/utils/queryOptionsGetSaldosContas";
import { useNotification } from "@/hooks/useNotification";
import { useQueryListarContas } from "@/services/contas/contas.hooks";

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

  const loading = useLoading();

  const queryClient = useQueryClient();

  const notification = useNotification();

  const queryListarContas = useQueryListarContas({ ativo: true });

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
      async (data) => {
        try {
          loading.setLoading(true);

          await postTransferir({
            contaOrigemId: data.contaOrigem.id,
            contaDestinoId: data.contaDestino.id,
            valor: data.valor,
          });

          queryClient.invalidateQueries({ queryKey: [KEY_GET_SALDOS_CONTAS] });

          notification.showSnackBar(
            "Transferência realizada com sucesso!",
            "success"
          );

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
    contasDestino,
    contasOrigem,
    modalTransferirSaldoForm,
    handleContaOrigemChange,
    handleTransferirSaldo,
  };
};

export default useModalTransferirSaldo;
