import { Control, useForm, UseFormHandleSubmit } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { auth } from "../../../../../FirebaseConnection";
import { IAutenticacao } from "../../../../shared/interfaces";
import { autenticacaoService } from "../../../../shared/services/autenticacao";
import { showSnackbar } from "../../../../shared/redux/snackBar/actions";
import { useDispatch } from "react-redux";

interface IUseLogin {
  control: Control<IAutenticacao>;
  onSubmit: () => void;
  handleSubmit: UseFormHandleSubmit<IAutenticacao>;
  handleNavigate: () => void;
  isPending: boolean;
  handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void;
}

export const useLogin = (): IUseLogin => {
  const { control, handleSubmit, reset } = useForm<IAutenticacao>();

  const navigate = useNavigate();

  const { mutate, isPending } = autenticacaoService.useMutationLogin();

  const dispatch = useDispatch();

  const onSubmit = () => {
    handleSubmit((data) => {
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
            reset();
            dispatch(showSnackbar(`${error}`, "error"));
          },
        }
      );
    })();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  const handleNavigate = () => {
    navigate(PATHS.AUTENTICACAO.CREATE);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    handleNavigate,
    isPending,
    handleKeyDown,
  };
};
