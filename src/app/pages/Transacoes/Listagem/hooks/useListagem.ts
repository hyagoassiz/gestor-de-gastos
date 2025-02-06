import { useContext, useMemo } from "react";
import { TransacoesContext } from "../context";
import { ITransacao } from "../../../../shared/interfaces";

interface IUseListagem {
  transacoes: ITransacao[] | undefined;
  badgeCount: number;
  handleAdicionarTransacao: () => void;
  handleEditarTransacao(transacao: ITransacao): void;
  handleExcluirTransacao(transacao: ITransacao): void;
  toggleFiltro: () => void;
}

const useListagem = (): IUseListagem => {
  const {
    transacoes,
    filtroData,
    setTrasacao,
    setOpenFiltro,
    setOpenModalTransacao,
    setOpenModalExcluir,
  } = useContext(TransacoesContext);

  const badgeCount: number = useMemo(() => {
    const concluido = filtroData.concluido.length === 1 ? 1 : 0;
    return concluido;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filtroData)]);

  function handleAdicionarTransacao() {
    setOpenModalTransacao((prevState) => !prevState);
  }

  function handleEditarTransacao(transacao: ITransacao) {
    setOpenModalTransacao((prevState) => !prevState);
    setTrasacao(transacao);
  }

  function handleExcluirTransacao(transacao: ITransacao) {
    setOpenModalExcluir((prevState) => !prevState);
    setTrasacao(transacao);
  }

  function toggleFiltro() {
    setOpenFiltro((prevToggle) => !prevToggle);
  }

  return {
    transacoes,
    badgeCount,
    handleAdicionarTransacao,
    handleEditarTransacao,
    handleExcluirTransacao,
    toggleFiltro,
  };
};

export default useListagem;
