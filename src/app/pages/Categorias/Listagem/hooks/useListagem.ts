import { useContext, useMemo } from "react";
import { CategoriasContext } from "../context";
import { ISeachBar } from "../../../../shared/interfaces";

interface IListagem {
  badgeCount: number;
  searchBar: ISeachBar;
  handleToggleFiltro: () => void;
  handleAdicionar: () => void;
}

const useListagem = (): IListagem => {
  const { setToggleFiltro, setToggleModalCategoria, filtroData, searchBar } =
    useContext(CategoriasContext);

  const badgeCount: number = useMemo(() => {
    const tipo = filtroData.tipo?.length || 0;
    const ativo = filtroData.ativo.some((_ativo) => _ativo === false) ? 1 : 0;
    return tipo + ativo;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filtroData)]);

  function handleAdicionar() {
    setToggleModalCategoria((prevState) => !prevState);
  }

  function handleToggleFiltro() {
    setToggleFiltro((prevToggle) => !prevToggle);
  }

  return { badgeCount, searchBar, handleToggleFiltro, handleAdicionar };
};

export default useListagem;
