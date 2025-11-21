import useUsuario from "@/hooks/useUsuario";
import { useForm, UseFormReturn } from "react-hook-form";

interface UsePerfilReturn {
  perfilForm: UseFormReturn<any>;
}

const usePerfil = (): UsePerfilReturn => {
  const { obterUsuario } = useUsuario();

  const perfilForm = useForm<any>({
    defaultValues: { nome: obterUsuario()?.nome, email: obterUsuario()?.sub },
  });

  return { perfilForm };
};

export default usePerfil;
