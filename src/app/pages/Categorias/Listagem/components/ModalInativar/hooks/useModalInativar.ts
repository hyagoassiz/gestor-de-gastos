import { useContext } from "react";
import { CategoriasContext } from "../../../context";

interface IUseModalInativar {
  toggleModalInativar: boolean;
  handleToggleModalInativar: () => void;
}

const useModalInativar = (): IUseModalInativar => {
  const { toggleModalInativar, setCategoria, setToggleModalInativar } =
    useContext(CategoriasContext);

  function handleToggleModalInativar() {
    setCategoria(undefined);
    setToggleModalInativar((prevState) => !prevState);
  }

  return { toggleModalInativar, handleToggleModalInativar };
};

export default useModalInativar;
