import { useForm, UseFormReturn } from "react-hook-form";
import { ICadastro } from "../interfaces";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { auth } from "../../../../../FirebaseConnection";
import { IAutenticacao } from "../../../../shared/interfaces";
import { autenticacaoService } from "../../../../shared/services/autenticacao";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastroSchema } from "../schema/cadastroSchema";

interface IUseCadastro {
  cadastroForm: UseFormReturn<ICadastro>;
  isPending: boolean;
  handleNavigate: () => void;
  handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void;
  onSubmit(): void;
}

export const useCadastro = (): IUseCadastro => {
  const cadastroForm = useForm<ICadastro>({
    resolver: zodResolver(cadastroSchema),
  });

  const navigate = useNavigate();

  const { mutate: mutateCriarEmail, isPending } =
    autenticacaoService.useMutationCriarEmail();

  const onSubmit = (): void => {
    cadastroForm.handleSubmit(async (data) => {
      const payload: IAutenticacao = {
        auth: auth,
        email: data.email,
        password: data.password,
      };
      mutateCriarEmail(
        { payload: payload },
        { onSuccess: () => navigate(PATHS.AUTENTICACAO.CHECK) }
      );
    })();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter") {
      cadastroForm.handleSubmit(onSubmit)();
    }
  };

  const handleNavigate = () => {
    navigate(PATHS.AUTENTICACAO.LOGIN);
  };

  return {
    cadastroForm,
    handleNavigate,
    handleKeyDown,
    onSubmit,
    isPending,
  };
};
