import { useForm, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { useEffect, useState } from "react";
import { useNotification } from "../../../../hooks/useNotification";
import { postLoginUsuario } from "../../../../api/Auth/postLoginUsuario";
import { ILoginForm } from "../interfaces";
import useUsuario from "../../../../hooks/useUsuario";

interface IUseLogin {
  isLoading: boolean;
  loginForm: UseFormReturn<ILoginForm>;
  handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void;
  onCreateAccount(): void;
  submitLoginForm(): void;
}

export const useLogin = (): IUseLogin => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginForm = useForm<ILoginForm>();

  const navigate = useNavigate();

  const { showSnackBar } = useNotification();

  const { salvarUsuario, removerUsuario } = useUsuario();

  useEffect(() => {
    removerUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (isLoading) return;

    if (event.key === "Enter") {
      submitLoginForm();
    }
  }

  function onCreateAccount(): void {
    navigate(PATHS.AUTH.CREATE);
  }

  function submitLoginForm(): void {
    loginForm.handleSubmit(async (data) => {
      try {
        setIsLoading(true);

        const response = await postLoginUsuario(data);

        salvarUsuario(response.token);

        navigate(PATHS.AUTH.VERIFICATION);
      } catch (error) {
        console.error(error);
        showSnackBar(String(error), "error");
      } finally {
        setIsLoading(false);
      }
    })();
  }

  return {
    isLoading,
    loginForm,
    handleKeyDown,
    onCreateAccount,
    submitLoginForm,
  };
};
