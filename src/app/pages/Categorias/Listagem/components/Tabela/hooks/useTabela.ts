import { useContext, useEffect } from "react";
import { CategoriasContext } from "../../../context";
import { categoriasService } from "../../../../../../shared/services/categorias";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setLoading } from "../../../../../../shared/redux/loading/actions";
import { ICategoria } from "../../../../../../shared/interfaces";

interface IUseTabela {
  categorias: ICategoria[] | undefined;
  handleInativar: (categoria: ICategoria) => void;
  handleEditar: (categoria: ICategoria) => void;
  handleAtivar: (categoria: ICategoria) => void;
}

const useTabela = (): IUseTabela => {
  const {
    categorias,
    setCategoria,
    setToggleModalInativar,
    setToggleModalCategoria,
    queryGetCategorias,
  } = useContext(CategoriasContext);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { mutate: mutateAlterarSituacaoCategoria, isPending } =
    categoriasService.useMutationAlterarSituacaoCategoria();

  useEffect(() => {
    dispatch(setLoading(isPending));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  function handleAtivar(categoria: ICategoria) {
    mutateAlterarSituacaoCategoria(
      {
        payload: { id: categoria.id, ativo: true },
      },
      {
        onSuccess: () => {
          queryGetCategorias.refetch();
          dispatch(
            showSnackbar(t("PAGES.CATEGORIAS.SNACK_BARS.ACTIVATE"), "success")
          );
        },
      }
    );
  }

  function handleEditar(categoria: ICategoria) {
    setToggleModalCategoria((prevState) => !prevState);
    setCategoria(categoria);
  }

  function handleInativar(categoria: ICategoria) {
    setCategoria(categoria);
    setToggleModalInativar((prevState) => !prevState);
  }

  return {
    categorias,
    handleInativar,
    handleEditar,
    handleAtivar,
  };
};

export default useTabela;
