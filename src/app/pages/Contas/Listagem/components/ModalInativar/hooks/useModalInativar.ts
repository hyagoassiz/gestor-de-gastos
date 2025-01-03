import { useContext, useEffect } from "react";
import { ContasContext } from "../../../context";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";
import { useTranslation } from "react-i18next";
import { setLoading } from "../../../../../../shared/redux/loading/actions";
import { contasService } from "../../../../../../shared/services/contas";
import { IConta } from "../../../../../../shared/interfaces";

interface IUseModalInativar {
  conta: IConta | undefined;
  toggleModalInativar: boolean;
  handleToggleModalInativar: () => void;
  handleInativar: () => void;
}

const useModalInativar = (): IUseModalInativar => {
  const {
    toggleModalInativar,
    setConta,
    setToggleModalInativar,
    conta,
    queryGetContas,
  } = useContext(ContasContext);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { mutate: mutateAlterarSituacaoCategoria, isPending } =
    contasService.useMutationAlterarSituacaoConta();

  useEffect(() => {
    dispatch(setLoading(isPending));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  function handleInativar() {
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
    handleToggleModalInativar();
  }

  function handleToggleModalInativar() {
    setConta(undefined);
    setToggleModalInativar((prevState) => !prevState);
  }

  return {
    conta,
    toggleModalInativar,
    handleToggleModalInativar,
    handleInativar,
  };
};

export default useModalInativar;
