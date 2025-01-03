import { useContext } from "react";
import { ContasContext } from "../../../context";
import { useForm, UseFormReturn } from "react-hook-form";
import { IFiltroForm } from "../../../interfaces";
import { IPayloadListarContas } from "../../../../../../shared/services/contas/interfaces";

interface IUseFiltro {
  filtroForm: UseFormReturn<IFiltroForm>;
  toggleFiltro: boolean;
  handleToggleFiltro: () => void;
  handleSubmit: () => void;
}

const useFiltro = (): IUseFiltro => {
  const { toggleFiltro, setToggleFiltro, setFiltroData, filtroData } =
    useContext(ContasContext);

  const filtroForm = useForm<IFiltroForm>();

  function handleSubmit() {
    filtroForm.handleSubmit(async (data) => {
      const formData: IPayloadListarContas = {
        ativo: !data.ativo ? [true] : [false],
        tipoConta: data.tipoConta,
      };
      setFiltroData(formData);
    })();
    setToggleFiltro((prevToggle) => !prevToggle);
  }

  function handleToggleFiltro() {
    setToggleFiltro((prevToggle) => !prevToggle);
    filtroForm.reset({
      tipoConta: filtroData.tipoConta,
      ativo: !filtroData.ativo[0],
    });
  }

  return {
    filtroForm,
    toggleFiltro,
    handleSubmit,
    handleToggleFiltro,
  };
};
export default useFiltro;
