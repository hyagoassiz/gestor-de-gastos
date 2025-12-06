import { useForm, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccountSchema } from "../schema/createAccountSchema";
import { CriarContaForm } from "../types";
import useUsuario from "@/hooks/useUsuario";
import { UsuarioCreatePayload } from "@/types";
import { useMutationCriarContaUsuario } from "@/services/usuarios/usuarios.hooks";

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

  const mutationCriarContaUsuario = useMutationCriarContaUsuario();

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
      mutationCriarContaUsuario.mutate(payload);
    })();
  }

  function handleEnter(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (mutationCriarContaUsuario.isPending) return;

    if (event.key === "Enter") {
      handleCriarConta();
    }
  }

  function handleLogin(): void {
    navigate(PATHS.AUTENTICACAO.LOGIN);
  }

  return {
    criarContaForm,
    isPending: mutationCriarContaUsuario.isPending,
    handleCriarConta,
    handleEnter,
    handleLogin,
  };
};
