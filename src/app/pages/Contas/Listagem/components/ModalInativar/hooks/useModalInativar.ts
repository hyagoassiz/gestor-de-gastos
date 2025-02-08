import { useContext, useEffect } from "react";
import { ContasContext } from "../../../context";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";
import { useTranslation } from "react-i18next";
import { setLoading } from "../../../../../../shared/redux/loading/actions";
import { contasService } from "../../../../../../shared/services/contas";

interface IUseModalInativar {
  openModalInativar: boolean;
  handleInativarConta(): void;
  toggleModalInativar(): void;
}

const useModalInativar = (): IUseModalInativar => {
  const {
    conta,
    openModalInativar,
    queryGetContas,
    setConta,
    setOpenModalInativar,
  } = useContext(ContasContext);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { mutate: mutateAlterarSituacaoCategoria, isPending } =
    contasService.useMutationAlterarSituacaoConta();

  useEffect(() => {
    dispatch(setLoading(isPending));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  function handleInativarConta(): void {
    if (conta) {
      mutateAlterarSituacaoCategoria(
        {
          payload: { id: conta.id, ativo: false },
        },
        {
          onSuccess: () => {
            queryGetContas.refetch();
            dispatch(
              showSnackbar(t("PAGES.CONTAS.SNACK_BARS.DEACTIVATE"), "success")
            );
          },
        }
      );
    }
    toggleModalInativar();
  }

  function toggleModalInativar(): void {
    setConta(undefined);
    setOpenModalInativar((prevState) => !prevState);
  }

  return {
    openModalInativar,
    handleInativarConta,
    toggleModalInativar,
  };
};

export default useModalInativar;
