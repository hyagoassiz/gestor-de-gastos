import { useContext, useMemo } from "react";
import { ContasContext } from "../../../context";

interface IUseModalObservacao {
  observacao: string;
  openModalObservacao: boolean;
  toggleModalObservacao(): void;
}
const useModalObservacao = (): IUseModalObservacao => {
  const { conta, openModalObservacao, setConta, setOpenModalObservacao } =
    useContext(ContasContext);

  const observacao: string = useMemo(() => {
    if (!openModalObservacao) {
      return "";
    }
    return conta?.observacao ?? "";
  }, [conta, openModalObservacao]);

  function toggleModalObservacao(): void {
    setOpenModalObservacao((prevState) => !prevState);
    setConta(undefined);
  }

  return {
    observacao,
    openModalObservacao,
    toggleModalObservacao,
  };
};

export default useModalObservacao;
