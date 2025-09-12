import { useForm, UseFormReturn } from "react-hook-form";
import { ICadastro } from "../interfaces";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { useEffect, useState } from "react";
import { useNotification } from "../../../../hooks/useNotification";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccountSchema } from "../schema/createAccountSchema";
import { postRegistarUsuario } from "../../../../api/Auth/postRegistarUsuario";
import useUsuario from "../../../../hooks/useUsuario";

interface IUseCreateAccount {
  createAccountForm: UseFormReturn<ICadastro>;
  isLoading: boolean;
  handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void;
  navigateToLogin: () => void;
  submitCreateAccountForm(): void;
}

export const useCreateAccount = (): IUseCreateAccount => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createAccountForm = useForm<ICadastro>({
    resolver: zodResolver(createAccountSchema),
  });

  const { showSnackBar } = useNotification();

  const navigate = useNavigate();

  const { removerUsuario } = useUsuario();

  useEffect(() => {
    removerUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function submitCreateAccountForm(): void {
    createAccountForm.handleSubmit(async (data) => {
      try {
        setIsLoading(true);

        const payload: IUsuarioPayloadApi = {
          nome: data.nome,
          email: data.email,
          senha: data.senha,
        };

        await postRegistarUsuario(payload);

        navigate(PATHS.AUTH.INFO);
      } catch (error) {
        console.error(error);
        showSnackBar(String(error), "error");
      } finally {
        setIsLoading(false);
      }
    })();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (isLoading) return;

    if (event.key === "Enter") {
      submitCreateAccountForm();
    }
  }

  function navigateToLogin(): void {
    navigate(PATHS.AUTH.LOGIN);
  }

  return {
    createAccountForm,
    isLoading,
    handleKeyDown,
    navigateToLogin,
    submitCreateAccountForm,
  };
};
