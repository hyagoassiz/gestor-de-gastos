import { useContext, useMemo } from "react";
import { ContasContext } from "../context";
import { ISeachBar } from "../../../../shared/interfaces";

interface IUseListagem {
  badgeCount: number;
  searchBar: ISeachBar;
  handleToggleFiltro: () => void;
  handleAdicionar: () => void;
}

const useListagem = (): IUseListagem => {
  const { setToggleFiltro, setToggleModalConta, filtroData, searchBar } =
    useContext(ContasContext);

  const badgeCount: number = useMemo(() => {
    const tipo = filtroData.tipoConta?.length || 0;
    const ativo = filtroData.ativo.some((_ativo) => _ativo === false) ? 1 : 0;
    return tipo + ativo;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filtroData)]);

  function handleAdicionar() {
    setToggleModalConta((prevState) => !prevState);
  }

  function handleToggleFiltro() {
    setToggleFiltro((prevToggle) => !prevToggle);
  }

  return { badgeCount, searchBar, handleToggleFiltro, handleAdicionar };
};

export default useListagem;
