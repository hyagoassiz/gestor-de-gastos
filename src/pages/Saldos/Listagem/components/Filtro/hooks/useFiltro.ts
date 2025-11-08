import { useUrlParams } from "@/hooks/useUrlParams";
import { SaldoContaParams } from "@/types";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseFiltroReturn {
  filtroForm: UseFormReturn<SaldoContaParams>;
  handleFiltroFormSubmit(): void;
}

const useFiltro = (): UseFiltroReturn => {
  const urlParms = useUrlParams();

  const filtroForm = useForm<SaldoContaParams>({
    defaultValues: {
      ativo: !(urlParms.getParam("ativo") === "false" ? false : true),
    },
  });

  function handleFiltroFormSubmit(): void {
    filtroForm.handleSubmit((data) => {
      urlParms.setParams({
        ativo: !data.ativo,
      });
    })();
  }

  return { filtroForm, handleFiltroFormSubmit };
};

export default useFiltro;
