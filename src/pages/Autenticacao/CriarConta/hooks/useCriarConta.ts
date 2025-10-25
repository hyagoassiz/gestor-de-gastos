import { useForm, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccountSchema } from "../schema/createAccountSchema";
import useUsuario from "../../../../hooks/useUsuario";
import { postCriarConta } from "@/api/Autenticacao/postCriarConta";
import { CriarContaForm } from "../types";
import { UsuarioCreatePayload } from "@/types/usuario";

interface UseCriarContaReturn {
  createAccountForm: UseFormReturn<CriarContaForm>;
  isLoading: boolean;
  handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void;
  navigateToLogin: () => void;
  submitCreateAccountForm(): void;
}

export const useCriarConta = (): UseCriarContaReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createAccountForm = useForm<CriarContaForm>({
    resolver: zodResolver(createAccountSchema),
  });

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

        const payload: UsuarioCreatePayload = {
          nome: data.nome,
          email: data.email,
          senha: data.senha,
        };

        await postCriarConta(payload);

        navigate(PATHS.AUTENTICACAO.LOGIN);
      } catch (error) {
        console.error(error);
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
    navigate(PATHS.AUTENTICACAO.LOGIN);
  }

  return {
    createAccountForm,
    isLoading,
    handleKeyDown,
    navigateToLogin,
    submitCreateAccountForm,
  };
};
