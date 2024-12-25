import { useContext } from "react";
import { CategoriasContext } from "../../../context";
import { useForm, UseFormReturn } from "react-hook-form";
import { IFiltroForm, IPayloadListarCategorias } from "../../../interfaces";

interface IUseFiltro {
  filtroForm: UseFormReturn<IFiltroForm>;
  toggleFiltro: boolean;
  handleToggleFiltro: () => void;
  handleSubmit: () => void;
}

const useFiltro = (): IUseFiltro => {
  const { toggleFiltro, setToggleFiltro, setFiltroData, filtroData } =
    useContext(CategoriasContext);

  const filtroForm = useForm<IFiltroForm>();

  function handleSubmit() {
    filtroForm.handleSubmit(async (data) => {
      const formData: IPayloadListarCategorias = {
        ativo: !data.ativo ? [true] : [false],
        tipo: data.tipo,
      };
      setFiltroData(formData);
    })();
    setToggleFiltro((prevToggle) => !prevToggle);
  }

  function handleToggleFiltro() {
    setToggleFiltro((prevToggle) => !prevToggle);
    filtroForm.reset({
      tipo: filtroData.tipo,
      ativo: !filtroData.ativo[0],
    });
  }

  return {
    handleSubmit,
    filtroForm,
    toggleFiltro,
    handleToggleFiltro,
  };
};
export default useFiltro;
