import { useForm, UseFormReturn } from "react-hook-form";
import { ICadastro } from "../interfaces";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../../shared/redux/snackBar/actions";
import { auth } from "../../../../../FirebaseConnection";
import { IAutenticacao } from "../../../../shared/interfaces";
import { autenticacaoService } from "../../../../shared/services/autenticacao";

interface IUseCadastro {
  cadastroForm: UseFormReturn<ICadastro>;
  isPending: boolean;
  handleNavigate: () => void;
  handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void;
  onSubmit(): void;
}

export const useCadastro = (): IUseCadastro => {
  const cadastroForm = useForm<ICadastro>();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { mutate: mutateCriarEmail, isPending } =
    autenticacaoService.useMutationCriarEmail();

  const onSubmit = () => {
    if (
      cadastroForm.getValues("password") !==
      cadastroForm.getValues("confirmPassword")
    ) {
      cadastroForm.setError("password", {
        type: "manual",
      });
      cadastroForm.setError("confirmPassword", {
        type: "manual",
      });
      dispatch(showSnackbar("As senhas não são iguais", "error"));
    } else {
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
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
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
