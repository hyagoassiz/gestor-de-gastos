import { useContext } from "react";
import { ICategoria } from "../../../../../../shared/interfaces";
import { CategoriasContext } from "../../../context";

interface IUseCategoriasTable {
  categorias: ICategoria[];
  handleToggleFiltro: () => void;
  handleInativar: (categoria: ICategoria) => void;
  handleAdicionar: () => void;
  handleEditar: (categoria: ICategoria) => void;
  handleAtivar: (categoria: ICategoria) => void;
}

const useCategoriasTable = (): IUseCategoriasTable => {
  const {
    categorias,
    setToggleFiltro,
    setCategoria,
    setToggleModalInativar,
    setToggleModalCategoria,
  } = useContext(CategoriasContext);

  function handleAtivar(categoria: ICategoria) {
    console.log(categoria);
  }

  function handleAdicionar() {
    setToggleModalCategoria((prevState) => !prevState);
  }

  function handleEditar(categoria: ICategoria) {
    setToggleModalCategoria((prevState) => !prevState);
    setCategoria(categoria);
  }

  function handleInativar(categoria: ICategoria) {
    setCategoria(categoria);
    setToggleModalInativar((prevState) => !prevState);
  }

  function handleToggleFiltro() {
    setToggleFiltro((prevToggle) => !prevToggle);
  }

  return {
    categorias,
    handleToggleFiltro,
    handleInativar,
    handleAdicionar,
    handleEditar,
    handleAtivar,
  };
};

export default useCategoriasTable;
