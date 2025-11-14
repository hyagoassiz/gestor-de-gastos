import { queryOptionsGetContas } from "@/api/Contas/utils/queryOptionsGetContas";
import { postTransferir } from "@/api/Saldos/postTransferir";
import { useLoading } from "@/hooks/useLoading";
import { Conta } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, UseFormReturn } from "react-hook-form";
import { ModalTransferirSaldoForm } from "../types";
import { KEY_GET_SALDOS_CONTAS } from "@/api/Saldos/utils/queryOptionsGetSaldosContas";
import { useNotification } from "@/hooks/useNotification";

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

  const queryGetContas = useQuery({
    ...queryOptionsGetContas({ ativo: true }),
  });

  const contasDestino = queryGetContas.data?.filter(
    (conta) => conta.id !== modalTransferirSaldoForm.watch("contaOrigem")?.id
  );

  const contasOrigem = queryGetContas.data;

  function handleContaOrigemChange(contaOrigem: Conta): void {
    modalTransferirSaldoForm.setValue("contaOrigem", contaOrigem);

    if (
      modalTransferirSaldoForm.getValues("contaDestino")?.id === contaOrigem.id
    ) {
      modalTransferirSaldoForm.setValue("contaDestino", null);
    }
  }

  function handleTransferirSaldo(): void {
    modalTransferirSaldoForm.handleSubmit(async (data) => {
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
    })();
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
