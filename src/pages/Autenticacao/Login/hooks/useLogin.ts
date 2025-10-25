import { useForm, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { useEffect } from "react";
import useUsuario from "../../../../hooks/useUsuario";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { UsuarioLoginPayload, UsuarioToken } from "@/types/usuario";
import { postLogin } from "@/api/Autenticacao/postLogin";

interface UseLoginReturn {
  loginForm: UseFormReturn<UsuarioLoginPayload>;
  mutatePostLogin: UseMutationResult<
    UsuarioToken,
    Error,
    Omit<UsuarioLoginPayload, "nome">
  >;
  handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void;
  onCreateAccount(): void;
  submitLoginForm(): void;
}

export const useLogin = (): UseLoginReturn => {
  const loginForm = useForm<UsuarioLoginPayload>();

  const navigate = useNavigate();

  const mutatePostLogin = useMutation({ mutationFn: postLogin });

  const { salvarUsuario, removerUsuario } = useUsuario();

  useEffect(() => {
    removerUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (mutatePostLogin.isPending) return;

    if (event.key === "Enter") {
      submitLoginForm();
    }
  }

  function onCreateAccount(): void {
    navigate(PATHS.AUTENTICACAO.CREATE);
  }

  function submitLoginForm(): void {
    loginForm.handleSubmit(async (data) => {
      try {
        const response = await mutatePostLogin.mutateAsync(data);

        salvarUsuario(response.token);

        navigate(PATHS.AUTENTICACAO.VERIFICATION);
      } catch (error) {
        console.error(error);
      }
    })();
  }

  return {
    loginForm,
    mutatePostLogin,
    handleKeyDown,
    onCreateAccount,
    submitLoginForm,
  };
};
