import { useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { TransacoesContext } from "../../../context";
import { IFiltroForm } from "../../../interfaces";
import { IPayloadListarTransacoes } from "../../../../../../shared/services/transacoes/interfaces";

interface IUseFiltro {
  filtroForm: UseFormReturn<IFiltroForm>;
  openFiltro: boolean;
  handleSubmit(): void;
  toggleFiltro(): void;
}

const useFiltro = (): IUseFiltro => {
  const { openFiltro, filtroData, setOpenFiltro, setFiltroData } =
    useContext(TransacoesContext);

  const filtroForm = useForm<IFiltroForm>();

  function handleSubmit(): void {
    filtroForm.handleSubmit(async (data) => {
      const formData: IPayloadListarTransacoes = {
        tipo: data.tipo,
        concluido: !data.concluido ? [true, false] : [false],
      };
      setFiltroData(formData);
    })();
    setOpenFiltro((prevToggle) => !prevToggle);
  }

  function toggleFiltro(): void {
    setOpenFiltro((prevToggle) => !prevToggle);
    filtroForm.reset({
      tipo: filtroData.tipo,
      concluido: !filtroData.concluido[0],
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
