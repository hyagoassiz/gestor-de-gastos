import { useForm, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccountSchema } from "../schema/createAccountSchema";
import { postCriarConta } from "@/api/Autenticacao/postCriarConta";
import { CriarContaForm } from "../types";
import { useNotification } from "@/hooks/useNotification";
import { useMutation } from "@tanstack/react-query";
import useUsuario from "@/hooks/useUsuario";
import { UsuarioCreatePayload } from "@/types";

interface UseCriarContaReturn {
  criarContaForm: UseFormReturn<CriarContaForm>;
  isPending: boolean;
  handleCriarConta(): void;
  handleEnter(event: React.KeyboardEvent<HTMLDivElement>): void;
  handleLogin: () => void;
}

export const useCriarConta = (): UseCriarContaReturn => {
  const criarContaForm = useForm<CriarContaForm>({
    resolver: zodResolver(createAccountSchema),
  });

  const navigate = useNavigate();

  const usuario = useUsuario();

  const notification = useNotification();

  const mutatePostCriarConta = useMutation({
    mutationFn: postCriarConta,
    onSuccess: () => {
      handleLogin();
      notification.showSnackBar("Conta criada com sucesso!", "success");
    },
  });

  useEffect(() => {
    usuario.removerUsuario();
  }, []);

  function handleCriarConta(): void {
    criarContaForm.handleSubmit((data) => {
      const payload: UsuarioCreatePayload = {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
      };
      mutatePostCriarConta.mutate(payload);
    })();
  }

  function handleEnter(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (mutatePostCriarConta.isPending) return;

    if (event.key === "Enter") {
      handleCriarConta();
    }
  }

  function handleLogin(): void {
    navigate(PATHS.AUTENTICACAO.LOGIN);
  }

  return {
    criarContaForm,
    isPending: mutatePostCriarConta.isPending,
    handleCriarConta,
    handleEnter,
    handleLogin,
  };
};
