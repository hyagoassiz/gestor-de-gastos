import { useUrlParams } from "@/hooks/useUrlParams";
import { TransacaoParamsPaginado } from "@/types";
import { useForm, UseFormReturn } from "react-hook-form";

interface IUseFiltroReturn {
  filtroForm: UseFormReturn<TransacaoParamsPaginado>;
  handleSubmitFiltroForm(): void;
}

const useFiltro = (): IUseFiltroReturn => {
  const { getParam, setParams } = useUrlParams();

  const filtroForm = useForm<TransacaoParamsPaginado>({
    defaultValues: {
      tipoMovimentacao: getParam("tipoMovimentacao"),
    },
  });

  function handleSubmitFiltroForm(): void {
    filtroForm.handleSubmit((data) => {
      setParams({
        pagina: 1,
        tipoMovimentacao: data.tipoMovimentacao,
        situacao: data.situacao,
      });
    })();
  }

  return { filtroForm, handleSubmitFiltroForm };
};

export default useFiltro;
