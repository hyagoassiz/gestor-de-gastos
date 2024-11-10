import { useContext } from "react";
import { CategoriasContext } from "../../../context";

interface IModalCategoria {
  toggleModalCategoria: boolean;
  handleToggleModalCategoria: () => void;
}
const useModalCategoria = (): IModalCategoria => {
  const { toggleModalCategoria, setToggleModalCategoria, setCategoria } =
    useContext(CategoriasContext);

  const handleToggleModalCategoria = () => {
    setToggleModalCategoria((prevState) => !prevState);
    setCategoria(undefined);
  };

  return { toggleModalCategoria, handleToggleModalCategoria };
};

export default useModalCategoria;
