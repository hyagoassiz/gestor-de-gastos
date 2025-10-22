import { useUrlParams } from "@/hooks/useUrlParams";
import { CategoriaParamsPaginado } from "@/types";
import { useForm, UseFormReturn } from "react-hook-form";

interface IUseFiltroReturn {
  filtroForm: UseFormReturn<CategoriaParamsPaginado>;
  handleSubmitFiltroForm(): void;
}

const useFiltro = (): IUseFiltroReturn => {
  const { getParam, setParams } = useUrlParams();

  const filtroForm = useForm<CategoriaParamsPaginado>({
    defaultValues: {
      ativo: !(getParam("ativo") === "false" ? false : true),
      tipoMovimentacao: getParam("tipoMovimentacao"),
    },
  });

  function handleSubmitFiltroForm(): void {
    filtroForm.handleSubmit((data) => {
      setParams({
        pagina: 1,
        tipoMovimentacao: data.tipoMovimentacao,
        ativo: !data.ativo,
      });
    })();
  }

  return { filtroForm, handleSubmitFiltroForm };
};

export default useFiltro;
