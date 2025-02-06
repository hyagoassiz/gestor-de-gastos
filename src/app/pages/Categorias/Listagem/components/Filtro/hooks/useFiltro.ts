import { useContext } from "react";
import { CategoriasContext } from "../../../context";
import { useForm, UseFormReturn } from "react-hook-form";
import { IFiltroForm } from "../../../interfaces";
import { IPayloadListarCategorias } from "../../../../../../shared/services/categorias/interfaces";

interface IUseFiltro {
  filtroForm: UseFormReturn<IFiltroForm>;
  openFiltro: boolean;
  handleSubmit(): void;
  toggleFiltro(): void;
}

const useFiltro = (): IUseFiltro => {
  const { openFiltro, setOpenFiltro, setFiltroData, filtroData } =
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
    setOpenFiltro((prevToggle) => !prevToggle);
  }

  function toggleFiltro() {
    setOpenFiltro((prevToggle) => !prevToggle);
    filtroForm.reset({
      tipo: filtroData.tipo,
      ativo: !filtroData.ativo[0],
    });
  }

  return {
    filtroForm,
    openFiltro,
    handleSubmit,
    toggleFiltro,
  };
};
export default useFiltro;
