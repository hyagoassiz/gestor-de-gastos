import { useContext } from "react";
import { ICategoria } from "../../../../../../shared/interfaces";
import { CategoriasContext } from "../../../context";

interface IUseCategoriasTable {
  categorias: ICategoria[];
  handleToggleFiltro: () => void;
  handleInativar: (categoria: ICategoria) => void;
  handleAdicionar: () => void;
}

const useCategoriasTable = (): IUseCategoriasTable => {
  const {
    categorias,
    setToggleFiltro,
    setCategoria,
    setToggleModalInativar,
    setToggleModalCategoria,
  } = useContext(CategoriasContext);

  function handleAdicionar() {
    setToggleModalCategoria((prevState) => !prevState);
  }

  function handleInativar(categoria: ICategoria) {
    setCategoria(categoria);
    setToggleModalInativar((prevState) => !prevState);
  }

  function handleToggleFiltro() {
    setToggleFiltro((prevToggle) => !prevToggle);
  }

  return { categorias, handleToggleFiltro, handleInativar, handleAdicionar };
};

export default useCategoriasTable;
