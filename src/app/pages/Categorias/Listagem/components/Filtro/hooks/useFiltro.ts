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
  const { toggleFiltro, setToggleFiltro, setFiltroData, filtroData } =
    useContext(CategoriasContext);

  const filtroForm = useForm<IFiltroForm>();

  const options: TypeCategoria[] = ["Entrada", "Saída"];

  function handleSubmit() {
    filtroForm.handleSubmit(async (data) => {
      setFiltroData({ ativo: [!data.situacao], tipo: data.tipo });
    })();
    setToggleFiltro((prevToggle) => !prevToggle);
  }

  function handleToggleFiltro() {
    setToggleFiltro((prevToggle) => !prevToggle);
    filtroForm.reset(filtroData);
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
