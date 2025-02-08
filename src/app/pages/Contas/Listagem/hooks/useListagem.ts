import { useContext, useEffect, useMemo } from "react";
import { ContasContext } from "../context";
import { IConta, ISeachBar } from "../../../../shared/interfaces";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { contasService } from "../../../../shared/services/contas";
import { setLoading } from "../../../../shared/redux/loading/actions";
import { showSnackbar } from "../../../../shared/redux/snackBar/actions";

interface IUseListagem {
  contas: IConta[] | undefined;
  searchBar: ISeachBar;
  badgeCount: number;
  handleAdicionarConta(): void;
  handleAtivarConta(conta: IConta): void;
  handleEditarConta(conta: IConta): void;
  handleInativarConta(conta: IConta): void;
  toggleFiltro(): void;
}

const useListagem = (): IUseListagem => {
  const {
    contas,
    searchBar,
    filtroData,
    queryGetContas,
    setConta,
    setOpenFiltro,
    setOpenModalConta,
    setOpenModalInativar,
  } = useContext(ContasContext);

  const badgeCount: number = useMemo(() => {
    const tipo = filtroData.tipoConta?.length || 0;
    const ativo = filtroData.ativo.some((_ativo) => _ativo === false) ? 1 : 0;
    return tipo + ativo;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filtroData)]);

  function handleAdicionarConta(): void {
    setOpenModalConta((prevState) => !prevState);
  }

  function toggleFiltro(): void {
    setOpenFiltro((prevToggle) => !prevToggle);
  }

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { mutate: mutateAlterarSituacaoConta, isPending } =
    contasService.useMutationAlterarSituacaoConta();

  useEffect(() => {
    dispatch(setLoading(isPending));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  function handleAtivarConta(categoria: IConta): void {
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

  function handleEditarConta(conta: IConta): void {
    setOpenModalConta((prevState) => !prevState);
    setConta(conta);
  }

  function handleInativarConta(conta: IConta): void {
    setConta(conta);
    setOpenModalInativar((prevState) => !prevState);
  }

  return {
    contas,
    searchBar,
    badgeCount,
    handleAdicionarConta,
    handleAtivarConta,
    handleEditarConta,
    handleInativarConta,
    toggleFiltro,
  };
};

export default useListagem;
