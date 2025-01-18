import { useContext, useEffect } from "react";
import { ContasContext } from "../../../context";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setLoading } from "../../../../../../shared/redux/loading/actions";
import { contasService } from "../../../../../../shared/services/contas";
import { IConta } from "../../../../../../shared/interfaces";

interface IUseTabela {
  contas: IConta[] | undefined;
  handleInativar: (conta: IConta) => void;
  handleEditar: (conta: IConta) => void;
  handleAtivar: (conta: IConta) => void;
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

  function handleAtivar(categoria: IConta) {
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

  function handleEditar(conta: IConta) {
    setToggleModalConta((prevState) => !prevState);
    setConta(conta);
  }

  function handleInativar(conta: IConta) {
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
