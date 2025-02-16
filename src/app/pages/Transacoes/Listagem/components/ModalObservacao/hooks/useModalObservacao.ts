import { useContext, useMemo } from "react";
import { TransacoesContext } from "../../../context";

interface IUseModalObservacao {
  observacao: string;
  openModalObservacao: boolean;
  toggleModalObservacao(): void;
}
const useModalObservacao = (): IUseModalObservacao => {
  const {
    transacao,
    openModalObservacao,
    setTrasacao,
    setOpenModalObservacao,
  } = useContext(TransacoesContext);

  const observacao: string = useMemo(() => {
    if (!openModalObservacao) {
      return "";
    }
    return transacao?.observacao ?? "";
  }, [transacao, openModalObservacao]);

  function toggleModalObservacao(): void {
    setOpenModalObservacao((prevState) => !prevState);
    setTrasacao(undefined);
  }

  return {
    observacao,
    openModalObservacao,
    toggleModalObservacao,
  };
};

export default useModalObservacao;
