import { useContext, useEffect } from "react";
import { ContasContext } from "../../../context";
import { IConta } from "../../../../../../shared/interfaces";
import { useForm, UseFormReturn } from "react-hook-form";
import { IContaForm } from "../../../interfaces";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";
import { IPayloadPersistirConta } from "../../../../../../shared/services/contas/interfaces";
import { contasService } from "../../../../../../shared/services/contas";

interface IUseModalConta {
  contaForm: UseFormReturn<IContaForm>;
  conta: IConta | undefined;
  openModalConta: boolean;
  onSubmit(): void;
  toggleModalConta(): void;
}
const useModalConta = (): IUseModalConta => {
  const { conta, openModalConta, queryGetContas, setConta, setOpenModalConta } =
    useContext(ContasContext);

  const contaForm = useForm<IContaForm>();

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { mutate: mutatePersistirCategoria } =
    contasService.useMutationPersistirConta();

  useEffect(() => {
    if (conta?.id && openModalConta) {
      (Object.keys(conta) as (keyof IConta)[]).forEach((key) => {
        contaForm.setValue(
          key as keyof IContaForm,
          conta[key] as IConta[keyof IConta]
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModalConta, conta]);

  function onSubmit(): void {
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
      toggleModalConta();
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

  function toggleModalConta(): void {
    setOpenModalConta((prevState) => !prevState);
    setConta(undefined);
    contaForm.reset();
  }

  return {
    contaForm,
    conta,
    openModalConta,
    onSubmit,
    toggleModalConta,
  };
};

export default useModalConta;
