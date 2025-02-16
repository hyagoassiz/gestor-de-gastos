import { useContext, useMemo } from "react";
import { TransacoesContext } from "../context";
import { ITransacao } from "../../../../shared/interfaces";

interface IUseListagem {
  transacoes: ITransacao[] | undefined;
  badgeCount: number;
  handleAdicionarTransacao: () => void;
  handleEditarTransacao(transacao: ITransacao): void;
  handleExcluirTransacao(transacao: ITransacao): void;
  toggleFiltro(): void;
  toggleModalObservacao(transacao: ITransacao): void;
}

const useListagem = (): IUseListagem => {
  const {
    transacoes,
    filtroData,
    setTrasacao,
    setOpenFiltro,
    setOpenModalTransacao,
    setOpenModalObservacao,
    setOpenModalExcluir,
  } = useContext(TransacoesContext);

  const badgeCount: number = useMemo(() => {
    const concluido = filtroData.concluido.length === 1 ? 1 : 0;
    return concluido;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filtroData)]);

  function handleAdicionarTransacao(): void {
    setOpenModalTransacao((prevState) => !prevState);
  }

  function handleEditarTransacao(transacao: ITransacao): void {
    setOpenModalTransacao((prevState) => !prevState);
    setTrasacao(transacao);
  }

  function handleExcluirTransacao(transacao: ITransacao): void {
    setOpenModalExcluir((prevState) => !prevState);
    setTrasacao(transacao);
  }

  function toggleFiltro(): void {
    setOpenFiltro((prevToggle) => !prevToggle);
  }

  function toggleModalObservacao(transacao: ITransacao): void {
    setTrasacao(transacao);
    setOpenModalObservacao((prevState) => !prevState);
  }

  return {
    transacoes,
    badgeCount,
    handleAdicionarTransacao,
    handleEditarTransacao,
    handleExcluirTransacao,
    toggleFiltro,
    toggleModalObservacao,
  };
};

export default useListagem;
