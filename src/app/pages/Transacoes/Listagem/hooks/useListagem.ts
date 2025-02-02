import { useContext, useMemo } from "react";
import { TransacoesContext } from "../context";
import { ITransacao } from "../../../../shared/interfaces";

interface IUseListagem {
  transacoes: ITransacao[] | undefined;
  badgeCount: number;
  handleToggleFiltro: () => void;
  handleAdicionar: () => void;
  handleEditarTransacao(transacao: ITransacao): void;
  handleExcluirTransacao(transacao: ITransacao): void;
}

const useListagem = (): IUseListagem => {
  const {
    transacoes,
    setTrasacao,
    filtroData,
    setToggleModalTransacao,
    setToggleFiltro,
    setToggleModalExcluir,
  } = useContext(TransacoesContext);

  const badgeCount: number = useMemo(() => {
    const concluido = filtroData.concluido.length === 1 ? 1 : 0;
    return concluido;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filtroData)]);

  function handleAdicionar() {
    setToggleModalTransacao((prevState) => !prevState);
  }

  function handleToggleFiltro() {
    setToggleFiltro((prevToggle) => !prevToggle);
  }

  function handleEditarTransacao(transacao: ITransacao) {
    setToggleModalTransacao((prevState) => !prevState);
    setTrasacao(transacao);
  }

  function handleExcluirTransacao(transacao: ITransacao) {
    setToggleModalExcluir((prevState) => !prevState);
    setTrasacao(transacao);
  }

  return {
    transacoes,
    badgeCount,
    handleToggleFiltro,
    handleAdicionar,
    handleEditarTransacao,
    handleExcluirTransacao,
  };
};

export default useListagem;
