import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { autenticacaoService } from "../../../../shared/services/autenticacao";
import { useForm, UseFormReturn } from "react-hook-form";
import { INome } from "../interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrarNomeSchema } from "../schema/registrarNomeSchema";

interface IUseRegistrarNome {
  registrarNomeForm: UseFormReturn<INome>;
  isPending: boolean;
  handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void;
  handleNavigate: () => void;
  onSubmit(): void;
}

export const useRegistrarNome = (): IUseRegistrarNome => {
  const registrarNomeForm = useForm<INome>({
    resolver: zodResolver(registrarNomeSchema),
  });

  const navigate = useNavigate();

  const { mutate, isPending } = autenticacaoService.useMutationPersistirNome();

  const onSubmit = () => {
    registrarNomeForm.handleSubmit(async (data) => {
      mutate(
        { displayName: data.nome },
        {
          onSuccess: () => {
            navigate(PATHS.CATEGORIAS.LIST);
          },
        }
      );
    })();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      registrarNomeForm.handleSubmit(onSubmit)();
    }
  };

  const handleNavigate = () => {
    navigate(PATHS.AUTENTICACAO.LOGIN);
  };

  return {
    registrarNomeForm,
    isPending,
    handleKeyDown,
    handleNavigate,
    onSubmit,
  };
};
