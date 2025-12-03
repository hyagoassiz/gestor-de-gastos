import { useUrlParams } from "@/hooks/useUrlParams";
import { ContaParams } from "@/types";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseFiltroReturn {
  filtroForm: UseFormReturn<ContaParams>;
  handleSubmitFiltroForm(): void;
}

const useFiltro = (): UseFiltroReturn => {
  const urlParams = useUrlParams();

  const filtroForm = useForm<ContaParams>({
    defaultValues: {
      ativo: !(urlParams.getParam("ativo") === "false" ? false : true),
      tipoConta: urlParams.getParam("tipoConta"),
      incluirEmSomas: urlParams.getParam("incluirEmSomas"),
    },
  });

  function handleSubmitFiltroForm(): void {
    filtroForm.handleSubmit((data) => {
      urlParams.setParams({
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
