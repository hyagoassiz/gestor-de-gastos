import { useUrlParams } from "@/hooks/useUrlParams";
import { TransacaoParamsPaginado } from "@/types";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseFiltroReturn {
  filtroForm: UseFormReturn<TransacaoParamsPaginado>;
  handleSubmitFiltroForm(): void;
}

const useFiltro = (): UseFiltroReturn => {
  const urlParams = useUrlParams();

  const filtroForm = useForm<TransacaoParamsPaginado>({
    defaultValues: {
      tipoMovimentacao: urlParams.getParam("tipoMovimentacao"),
    },
  });

  function handleSubmitFiltroForm(): void {
    filtroForm.handleSubmit((data) => {
      urlParams.setParams({
        pagina: 1,
        tipoMovimentacao: data.tipoMovimentacao,
        situacao: data.situacao,
      });
    })();
  }

  return { filtroForm, handleSubmitFiltroForm };
};

export default useFiltro;
