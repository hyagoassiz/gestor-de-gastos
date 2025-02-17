import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";
import { useTranslation } from "react-i18next";
import { setLoading } from "../../../../../../shared/redux/loading/actions";
import { TransacoesContext } from "../../../context";
import { transacoesService } from "../../../../../../shared/services/transacoes";

interface IUseModalExcluir {
  openModalExcluir: boolean;
  handleExcluirTransacao(): void;
  toggleModalExcluir(): void;
}

const useModalExcluir = (): IUseModalExcluir => {
  const {
    transacao,
    openModalExcluir,
    queryGetTransacoes,
    setTrasacao,
    setOpenModalExcluir,
  } = useContext(TransacoesContext);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { mutate, isPending } = transacoesService.useMutationExcluirTransacao();

  useEffect(() => {
    dispatch(setLoading(isPending));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  function handleExcluirTransacao(): void {
    if (transacao) {
      mutate(
        {
          payload: transacao,
        },
        {
          onSuccess: () => {
            queryGetTransacoes.refetch();
            dispatch(
              showSnackbar(t("PAGES.CONTAS.SNACK_BARS.DEACTIVATE"), "success")
            );
          },
        }
      );
    }
    toggleModalExcluir();
  }

  function toggleModalExcluir(): void {
    setTrasacao(undefined);
    setOpenModalExcluir((prevState) => !prevState);
  }

  return {
    openModalExcluir,
    handleExcluirTransacao,
    toggleModalExcluir,
  };
};

export default useModalExcluir;
