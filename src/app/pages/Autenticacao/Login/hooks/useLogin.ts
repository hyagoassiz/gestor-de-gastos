import { useForm, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { auth } from "../../../../../FirebaseConnection";
import { IAutenticacao } from "../../../../shared/interfaces";
import { autenticacaoService } from "../../../../shared/services/autenticacao";
import { showSnackbar } from "../../../../shared/redux/snackBar/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface IUseLogin {
  loginForm: UseFormReturn<IAutenticacao>;
  isPending: boolean;
  onSubmit(): void;
  handleNavigate(): void;
  handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void;
}

export const useLogin = (): IUseLogin => {
  const loginForm = useForm<IAutenticacao>();

  const navigate = useNavigate();

  const queryLogOut = useQuery({
    enabled: false,
    ...autenticacaoService.useQueryLogOut(),
  });

  const { mutate, isPending } = autenticacaoService.useMutationLogin();

  const dispatch = useDispatch();

  useEffect(() => {
    queryLogOut.refetch();
  }, []);

  const onSubmit = (): void => {
    loginForm.handleSubmit((data) => {
      const payload: IAutenticacao = {
        auth: auth,
        email: data.email,
        password: data.password,
      };
      mutate(
        { payload: payload },
        {
          onSuccess: () => navigate(PATHS.CATEGORIAS.LIST),
          onError: (error) => {
            loginForm.reset();
            dispatch(showSnackbar(`${error}`, "error"));
          },
        }
      );
    })();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter") {
      loginForm.handleSubmit(onSubmit)();
    }
  };

  const handleNavigate = (): void => {
    navigate(PATHS.AUTENTICACAO.CREATE);
  };

  return {
    loginForm,
    isPending,
    onSubmit,
    handleNavigate,
    handleKeyDown,
  };
};
