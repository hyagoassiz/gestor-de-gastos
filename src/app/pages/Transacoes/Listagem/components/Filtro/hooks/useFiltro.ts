import { useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { TransacoesContext } from "../../../context";
import { IFiltroForm } from "../../../interfaces";
import { IPayloadListarTransacoes } from "../../../../../../shared/services/transacoes/interfaces";

interface IUseFiltro {
  filtroForm: UseFormReturn<IFiltroForm>;
  toggleFiltro: boolean;
  handleToggleFiltro: () => void;
  handleSubmit: () => void;
}

const useFiltro = (): IUseFiltro => {
  const { toggleFiltro, setToggleFiltro, setFiltroData, filtroData } =
    useContext(TransacoesContext);

  const filtroForm = useForm<IFiltroForm>();

  function handleSubmit() {
    filtroForm.handleSubmit(async (data) => {
      const formData: IPayloadListarTransacoes = {
        tipo: data.tipo,
        concluido: !data.concluido ? [true] : [false],
      };
      console.log(formData);
      setFiltroData(formData);
    })();
    setToggleFiltro((prevToggle) => !prevToggle);
  }

  function handleToggleFiltro() {
    setToggleFiltro((prevToggle) => !prevToggle);
    filtroForm.reset({
      tipo: filtroData.tipo,
      concluido: !filtroData.concluido[0],
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
