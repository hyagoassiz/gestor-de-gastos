import { useUrlParams } from "@/hooks/useUrlParams";
import { SaldoContaParams } from "@/types";
import { useForm, UseFormReturn } from "react-hook-form";

interface IUseFiltroReturn {
  filtroForm: UseFormReturn<SaldoContaParams>;
  handleSubmitFiltroForm(): void;
}

const useFiltro = (): IUseFiltroReturn => {
  const { getParam, setParams } = useUrlParams();

  const filtroForm = useForm<SaldoContaParams>({
    defaultValues: {
      ativo: !(getParam("ativo") === "false" ? false : true),
    },
  });

  function handleSubmitFiltroForm(): void {
    filtroForm.handleSubmit((data) => {
      setParams({
        ativo: !data.ativo,
      });
    })();
  }

  return { filtroForm, handleSubmitFiltroForm };
};

export default useFiltro;
