import { useContext } from "react";
import { CategoriasContext } from "../../../context";
import { ICategoria } from "../../../../../../shared/interfaces";

interface IUseModalInativar {
  categoria: ICategoria | undefined;
  toggleModalInativar: boolean;
  handleToggleModalInativar: () => void;
}

const useModalInativar = (): IUseModalInativar => {
  const {
    toggleModalInativar,
    setCategoria,
    setToggleModalInativar,
    categoria,
  } = useContext(CategoriasContext);

  function handleToggleModalInativar() {
    setCategoria(undefined);
    setToggleModalInativar((prevState) => !prevState);
  }

  return { categoria, toggleModalInativar, handleToggleModalInativar };
};

export default useModalInativar;
