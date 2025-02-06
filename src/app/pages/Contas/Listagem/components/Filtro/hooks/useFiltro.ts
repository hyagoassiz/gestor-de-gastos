import { useContext } from "react";
import { ContasContext } from "../../../context";
import { useForm, UseFormReturn } from "react-hook-form";
import { IFiltroForm } from "../../../interfaces";
import { IPayloadListarContas } from "../../../../../../shared/services/contas/interfaces";

interface IUseFiltro {
  filtroForm: UseFormReturn<IFiltroForm>;
  openFiltro: boolean;
  toggleFiltro(): void;
  handleSubmit(): void;
}

const useFiltro = (): IUseFiltro => {
  const { openFiltro, filtroData, setOpenFiltro, setFiltroData } =
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
    setOpenFiltro((prevToggle) => !prevToggle);
  }

  function toggleFiltro() {
    setOpenFiltro((prevToggle) => !prevToggle);
    filtroForm.reset({
      tipoConta: filtroData.tipoConta,
      ativo: !filtroData.ativo[0],
    });
  }

  return {
    filtroForm,
    openFiltro,
    toggleFiltro,
    handleSubmit,
  };
};
export default useFiltro;
