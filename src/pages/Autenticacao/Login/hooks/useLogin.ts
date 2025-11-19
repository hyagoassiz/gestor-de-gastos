import { useForm, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLogin } from "@/api/Autenticacao/postLogin";
import { UsuarioLoginPayload } from "@/types";
import useUsuario from "@/hooks/useUsuario";
import { loginSchema } from "../schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { LoginForm } from "../types";

interface UseLoginReturn {
  isPending: boolean;
  loginForm: UseFormReturn<LoginForm>;
  handleEnter(event: React.KeyboardEvent<HTMLDivElement>): void;
  handleCriarConta(): void;
  handleLogin(): void;
}

export const useLogin = (): UseLoginReturn => {
  const localStorage = useLocalStorage();

  const lembrarEmailKey: string = "lembrarEmail";

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: localStorage.obter(lembrarEmailKey) ?? "",
      lembrarEmail: Boolean(localStorage.obter(lembrarEmailKey)),
    },
  });

  const usuario = useUsuario();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutatePostLogin = useMutation({
    mutationFn: postLogin,
    onSuccess: (response) => {
      usuario.salvarUsuario(response.token);
      handleLembrarEmail();
      navigate(PATHS.DASHBOARD.LIST);
    },
  });

  useEffect(() => {
    usuario.removerUsuario();
    queryClient.clear();
  }, []);

  function handleEnter(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (mutatePostLogin.isPending) {
      return;
    }

    if (event.key === "Enter") {
      handleLogin();
    }
  }

  function handleCriarConta(): void {
    navigate(PATHS.AUTENTICACAO.CREATE);
  }

  function handleLembrarEmail(): void {
    const checked = loginForm.getValues("lembrarEmail");

    if (checked) {
      localStorage.salvar(lembrarEmailKey, loginForm.getValues("email"));
      return;
    }

    localStorage.remover(lembrarEmailKey);
  }

  function handleLogin(): void {
    loginForm.handleSubmit((data) => {
      const payload: UsuarioLoginPayload = {
        email: data.email,
        senha: data.senha,
      };

      mutatePostLogin.mutate(payload);
    })();
  }

  return {
    isPending: mutatePostLogin.isPending,
    loginForm,
    handleEnter,
    handleCriarConta,
    handleLogin,
  };
};
