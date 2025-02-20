import { useContext, useEffect } from "react";
import { SaldosContext } from "../../../context";
import { useForm, UseFormReturn } from "react-hook-form";
import { IModalTransferirForm } from "../../../interfaces";
import { useQuery } from "@tanstack/react-query";
import { contasService } from "../../../../../../shared/services/contas";
import { IConta } from "../../../../../../shared/interfaces";
import { transacoesService } from "../../../../../../shared/services/transacoes";
import { IPayloadPersistirTransacao } from "../../../../../../shared/services/transacoes/interfaces";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";

interface IUseModalTransferir {
  contas: IConta[] | undefined;
  modalTransferirForm: UseFormReturn<IModalTransferirForm>;
  openModalTransferir: boolean;
  handleTransferirSaldo(): void;
  toggleModalTransferir(): void;
}
const useModalTransferir = (): IUseModalTransferir => {
  const {
    queryGetTransacoes,
    saldos,
    openModalTransferir,
    idConta,
    setOpenModalTransferir,
    setIdConta,
  } = useContext(SaldosContext);

  const modalTransferirForm = useForm<IModalTransferirForm>();

  const dispatch = useDispatch();

  const { data: contas } = useQuery({
    ...contasService.useQueryGetContas({
      ativo: [true],
      tipoConta: [],
    }),
  });

  const { mutate: mutatePersistirTransacao } =
    transacoesService.useMutationPersistirTransacao();

  useEffect(() => {
    if (idConta && openModalTransferir && contas) {
      const contaOrigem = getConta(idConta, contas);

      modalTransferirForm.reset({
        ...modalTransferirForm.getValues(),
        contaOrigem,
      });

      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idConta, contas, openModalTransferir]);

  function getConta(idConta: string, contas: IConta[]): IConta {
    return contas.find((conta) => conta.id === idConta) || ({} as IConta);
  }

  function toggleModalTransferir(): void {
    setOpenModalTransferir(!openModalTransferir);
    setIdConta(null);
    modalTransferirForm.reset({
      data: undefined,
      contaDestino: undefined,
      contaOrigem: undefined,
      valor: 0,
    });
  }

  function handleTransferirSaldo(): void {
    modalTransferirForm.handleSubmit((data) => {
      const saldoAtual = saldos?.find(
        (saldo) => saldo.idConta === data.contaOrigem.id
      );

      if ((saldoAtual?.valores?.concluido?.saldo || 0) < data.valor) {
        dispatch(
          showSnackbar(
            "A conta de origem não possui saldo suficiente para realizar a transferência.",
            "error"
          )
        );
        modalTransferirForm.setError("valor", { message: "", type: "manual" });

        return;
      }

      const payloadSaida: IPayloadPersistirTransacao = {
        tipo: "SAIDA",
        data: data.data,
        valor: data.valor,
        idCategoria: data.contaOrigem.id,
        idConta: data.contaOrigem.id,
        concluido: true,
        observacao: "",
        eTransferencia: true,
      };

      const payloadEntrada: IPayloadPersistirTransacao = {
        tipo: "ENTRADA",
        data: data.data,
        valor: data.valor,
        idCategoria: data.contaDestino.id,
        idConta: data.contaDestino.id,
        concluido: true,
        observacao: "",
        eTransferencia: true,
      };

      mutatePersistirTransacao(
        { payload: payloadSaida },
        {
          onSuccess: () => {
            mutatePersistirTransacao(
              { payload: payloadEntrada },
              {
                onSuccess: () => {
                  toggleModalTransferir();
                  queryGetTransacoes.refetch();
                  dispatch(
                    showSnackbar(
                      "Transferência realizada com sucesso!",
                      "success"
                    )
                  );
                },
              }
            );
          },
        }
      );
    })();
  }

  return {
    contas,
    modalTransferirForm,
    openModalTransferir,
    handleTransferirSaldo,
    toggleModalTransferir,
  };
};

export default useModalTransferir;
