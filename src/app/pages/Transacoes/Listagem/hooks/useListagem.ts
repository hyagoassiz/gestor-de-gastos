import { useContext, useMemo } from "react";
import { TransacoesContext } from "../context";
import { ITransacao } from "../../../../shared/interfaces";

interface IUseListagem {
  transacoes: ITransacao[] | undefined;
  badgeCount: number;
  handleToggleFiltro: () => void;
  handleAdicionar: () => void;
}

const useListagem = (): IUseListagem => {
  const { transacoes, filtroData, setToggleModalTransacao, setToggleFiltro } =
    useContext(TransacoesContext);

  const badgeCount: number = useMemo(() => {
    const ativo = filtroData.concluido.some((_ativo) => _ativo === false)
      ? 1
      : 0;
    return ativo;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filtroData)]);

  function handleAdicionar() {
    setToggleModalTransacao((prevState) => !prevState);
  }

  function handleToggleFiltro() {
    setToggleFiltro((prevToggle) => !prevToggle);
  }

  return {
    transacoes,
    badgeCount,
    handleToggleFiltro,
    handleAdicionar,
  };
};

export default useListagem;
