import { useUrlParams } from "@/hooks/useUrlParams";
import { ContaParams } from "@/types";
import { useForm, UseFormReturn } from "react-hook-form";

interface IUseFiltroReturn {
  filtroForm: UseFormReturn<ContaParams>;
  handleSubmitFiltroForm(): void;
}

const useFiltro = (): IUseFiltroReturn => {
  const { getParam, setParams } = useUrlParams();

  const filtroForm = useForm<ContaParams>({
    defaultValues: {
      ativo: Boolean(getParam("ativo")),
      tipoConta: getParam("tipoConta"),
      incluirEmSomas: getParam("incluirEmSomas") ?? null,
    },
  });

  function handleSubmitFiltroForm(): void {
    filtroForm.handleSubmit((data) => {
      setParams({
        pagina: 1,
        tipoConta: data.tipoConta,
        incluirEmSomas: data.incluirEmSomas,
        ativo: !data.ativo,
      });
    })();
  }

  return { filtroForm, handleSubmitFiltroForm };
};

export default useFiltro;
