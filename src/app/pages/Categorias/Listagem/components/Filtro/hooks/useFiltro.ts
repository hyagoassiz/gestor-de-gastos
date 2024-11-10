import { useContext } from "react";
import { CategoriasContext } from "../../../context";
import { useForm, UseFormReturn } from "react-hook-form";
import { IFiltroForm } from "../../../interfaces";
import { TypeCategoria } from "../../../../../../shared/interfaces";

interface IUseFiltro {
  filtroForm: UseFormReturn<IFiltroForm>;
  toggleFiltro: boolean;
  options: TypeCategoria[];
  handleToggleFiltro: () => void;
  handleSubmit: () => void;
}

const useFiltro = (): IUseFiltro => {
  const { toggleFiltro, setToggleFiltro } = useContext(CategoriasContext);

  const filtroForm = useForm<IFiltroForm>();

  const options: TypeCategoria[] = ["Entrada", "Saída"];

  function handleSubmit() {
    filtroForm.handleSubmit((data) => {
      console.log(data);
    })();
    setToggleFiltro((prevToggle) => !prevToggle);
  }

  function handleToggleFiltro() {
    setToggleFiltro((prevToggle) => !prevToggle);
  }

  return {
    handleSubmit,
    filtroForm,
    toggleFiltro,
    options,
    handleToggleFiltro,
  };
};
export default useFiltro;
