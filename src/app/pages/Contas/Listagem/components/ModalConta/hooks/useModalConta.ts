import { useContext, useEffect } from "react";
import { ContasContext } from "../../../context";
import { IConta } from "../../../../../../shared/interfaces";
import { useForm, UseFormReturn } from "react-hook-form";
import { IContaForm } from "../../../interfaces";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";
import {
  IPayloadPersistirConta,
  IResponseConta,
} from "../../../../../../shared/services/contas/interfaces";
import { contasService } from "../../../../../../shared/services/contas";

interface IUseModalConta {
  contaForm: UseFormReturn<IContaForm>;
  conta: IResponseConta | undefined;
  toggleModalConta: boolean;
  handleToggleModalConta: () => void;
  onSubmit(): void;
}
const useModalConta = (): IUseModalConta => {
  const {
    toggleModalConta,
    setToggleModalConta,
    setConta,
    conta,
    queryGetContas,
  } = useContext(ContasContext);

  const contaForm = useForm<IContaForm>();

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { mutate: mutatePersistirCategoria } =
    contasService.useMutationPersistirConta();

  useEffect(() => {
    if (conta?.id && toggleModalConta) {
      (Object.keys(conta) as (keyof IConta)[]).forEach((key) => {
        contaForm.setValue(
          key as keyof IConta,
          conta[key] as IConta[keyof IConta]
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleModalConta, conta]);

  function onSubmit() {
    contaForm.handleSubmit(async (data) => {
      const payload: IPayloadPersistirConta = {
        id: data.id ?? undefined,
        nome: data.nome,
        tipoConta: data.tipoConta,
        incluirSoma: data.incluirSoma ?? true,
        agencia: data.agencia ?? "",
        conta: data.conta ?? "",
        observacao: data.observacao ?? "",
        ativo: true,
      };
      handleToggleModalConta();
      mutatePersistirCategoria(
        { payload: payload },
        {
          onSuccess: () => {
            queryGetContas.refetch();
            dispatch(
              showSnackbar(
                !payload.id
                  ? t("PAGES.CONTAS.SNACK_BARS.CREATE")
                  : t("PAGES.CONTAS.SNACK_BARS.EDIT"),
                "success"
              )
            );
          },
        }
      );
    })();
  }

  function handleToggleModalConta() {
    setToggleModalConta((prevState) => !prevState);
    setConta(undefined);
    contaForm.reset();
  }

  return {
    contaForm,
    conta,
    toggleModalConta,
    handleToggleModalConta,
    onSubmit,
  };
};

export default useModalConta;
