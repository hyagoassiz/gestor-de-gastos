import { useContext, useEffect } from "react";
import { CategoriasContext } from "../../../context";
import { IResponseCategoria } from "../../../../../../shared/services/categorias/interfaces";
import { categoriasService } from "../../../../../../shared/services/categorias";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setLoading } from "../../../../../../shared/redux/loading/actions";

interface IUseTabela {
  categorias: IResponseCategoria[] | undefined;
  handleInativar: (categoria: IResponseCategoria) => void;
  handleEditar: (categoria: IResponseCategoria) => void;
  handleAtivar: (categoria: IResponseCategoria) => void;
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

  function handleAtivar(categoria: IResponseCategoria) {
    mutateAlterarSituacaoCategoria(
      {
        payload: { id: categoria.id, ativo: true },
      },
      {
        onSuccess: () => {
          queryGetCategorias.refetch();
          dispatch(
            showSnackbar(
              t("PAGES.CATEGORIAS.SNACK_BARS.CATEGORIA_ACTIVATE"),
              "success"
            )
          );
        },
      }
    );
  }

  function handleEditar(categoria: IResponseCategoria) {
    setToggleModalCategoria((prevState) => !prevState);
    setCategoria(categoria);
  }

  function handleInativar(categoria: IResponseCategoria) {
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
