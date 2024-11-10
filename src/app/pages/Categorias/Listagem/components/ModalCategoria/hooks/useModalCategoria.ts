import { useContext, useEffect } from "react";
import { CategoriasContext } from "../../../context";
import { ICategoria, TypeCategoria } from "../../../../../../shared/interfaces";
import { useForm, UseFormReturn } from "react-hook-form";

interface IModalCategoria {
  categoriaForm: UseFormReturn<ICategoria>;
  categoria: ICategoria | undefined;
  options: TypeCategoria[];
  toggleModalCategoria: boolean;
  handleToggleModalCategoria: () => void;
  handleSubmit: () => void;
}
const useModalCategoria = (): IModalCategoria => {
  const {
    toggleModalCategoria,
    setToggleModalCategoria,
    setCategoria,
    categoria,
  } = useContext(CategoriasContext);

  const categoriaForm = useForm<ICategoria>();

  const options: TypeCategoria[] = ["Entrada", "Saída"];

  useEffect(() => {
    if (categoria?.id && toggleModalCategoria) {
      (Object.keys(categoria) as (keyof ICategoria)[]).forEach((key) => {
        categoriaForm.setValue(
          key as keyof ICategoria,
          categoria[key] as ICategoria[keyof ICategoria]
        );
      });
    }
  }, [toggleModalCategoria, categoria, categoriaForm]);

  function handleSubmit() {
    categoriaForm.handleSubmit((data) => {
      console.log(data);
    });
    handleToggleModalCategoria();
  }

  function handleToggleModalCategoria() {
    setToggleModalCategoria((prevState) => !prevState);
    setCategoria(undefined);
    categoriaForm.reset();
  }

  return {
    categoriaForm,
    categoria,
    options,
    toggleModalCategoria,
    handleToggleModalCategoria,
    handleSubmit,
  };
};

export default useModalCategoria;
