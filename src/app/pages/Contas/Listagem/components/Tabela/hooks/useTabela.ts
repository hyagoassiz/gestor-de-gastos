import { useContext, useEffect } from "react";
import { ContasContext } from "../../../context";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setLoading } from "../../../../../../shared/redux/loading/actions";
import { IResponseConta } from "../../../../../../shared/services/contas/interfaces";
import { contasService } from "../../../../../../shared/services/contas";

interface IUseTabela {
  contas: IResponseConta[] | undefined;
  handleInativar: (conta: IResponseConta) => void;
  handleEditar: (conta: IResponseConta) => void;
  handleAtivar: (conta: IResponseConta) => void;
}

const useTabela = (): IUseTabela => {
  const {
    contas,
    setConta,
    setToggleModalInativar,
    setToggleModalConta,
    queryGetContas,
  } = useContext(ContasContext);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { mutate: mutateAlterarSituacaoConta, isPending } =
    contasService.useMutationAlterarSituacaoConta();

  useEffect(() => {
    dispatch(setLoading(isPending));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  function handleAtivar(categoria: IResponseConta) {
    mutateAlterarSituacaoConta(
      {
        payload: { id: categoria.id, ativo: true },
      },
      {
        onSuccess: () => {
          queryGetContas.refetch();
          dispatch(
            showSnackbar(t("PAGES.CONTAS.SNACK_BARS.ACTIVATE"), "success")
          );
        },
      }
    );
  }

  function handleEditar(conta: IResponseConta) {
    setToggleModalConta((prevState) => !prevState);
    setConta(conta);
  }

  function handleInativar(conta: IResponseConta) {
    setConta(conta);
    setToggleModalInativar((prevState) => !prevState);
  }

  return {
    contas,
    handleInativar,
    handleEditar,
    handleAtivar,
  };
};

export default useTabela;
