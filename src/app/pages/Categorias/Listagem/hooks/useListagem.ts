import { useContext, useMemo } from "react";
import { CategoriasContext } from "../context";

interface IListagem {
  badgeCount: number;
  handleToggleFiltro: () => void;
  handleAdicionar: () => void;
}

const useListagem = (): IListagem => {
  const { setToggleFiltro, setToggleModalCategoria, filtroData } =
    useContext(CategoriasContext);

  const badgeCount: number = useMemo(() => {
    const tipo = filtroData.tipo?.length || 0;
    const ativo = filtroData.ativo.some((_ativo) => _ativo === false) ? 1 : 0;
    return tipo + ativo;
  }, [JSON.stringify(filtroData)]);

  function handleAdicionar() {
    setToggleModalCategoria((prevState) => !prevState);
  }

  function handleToggleFiltro() {
    setToggleFiltro((prevToggle) => !prevToggle);
  }

  return { badgeCount, handleToggleFiltro, handleAdicionar };
};

export default useListagem;
