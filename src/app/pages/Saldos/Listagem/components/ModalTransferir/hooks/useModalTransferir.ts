import { useContext, useEffect } from "react";
import { SaldosContext } from "../../../context";
import { useForm, UseFormReturn } from "react-hook-form";
import { IModalTransferirForm } from "../../../interfaces";
import { useQuery } from "@tanstack/react-query";
import { contasService } from "../../../../../../shared/services/contas";
import { IConta } from "../../../../../../shared/interfaces";

interface IUseModalTransferir {
  contas: IConta[] | undefined;
  modalTransferirForm: UseFormReturn<IModalTransferirForm>;
  openModalTransferir: boolean;
  toggleModalTransferir(): void;
}
const useModalTransferir = (): IUseModalTransferir => {
  const { openModalTransferir, idConta, setOpenModalTransferir, setIdConta } =
    useContext(SaldosContext);

  const modalTransferirForm = useForm<IModalTransferirForm>();

  const { data: contas } = useQuery({
    ...contasService.useQueryGetContas({
      ativo: [true],
      tipoConta: ["Conta Corrente", "Outros", "Poupança", "Investimentos"],
    }),
  });

  useEffect(() => {
    if (idConta && openModalTransferir && contas) {
      const contaOrigem = getConta(idConta, contas);

      console.log(contaOrigem);
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
  }

  return {
    contas,
    modalTransferirForm,
    openModalTransferir,
    toggleModalTransferir,
  };
};

export default useModalTransferir;
