import { useContext, useEffect } from "react";
import { CategoriasContext } from "../../../context";
import { ICategoria } from "../../../../../../shared/interfaces";
import { categoriasService } from "../../../../../../shared/services/categorias";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";
import { useTranslation } from "react-i18next";
import { setLoading } from "../../../../../../shared/redux/loading/actions";

interface IUseModalInativar {
  categoria: ICategoria | undefined;
  toggleModalInativar: boolean;
  handleToggleModalInativar: () => void;
  handleInativar: () => void;
}

const useModalInativar = (): IUseModalInativar => {
  const {
    toggleModalInativar,
    setCategoria,
    setToggleModalInativar,
    categoria,
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

  function handleInativar() {
    if (categoria) {
      mutateAlterarSituacaoCategoria(
        {
          payload: { id: categoria.id, ativo: false },
        },
        {
          onSuccess: () => {
            queryGetCategorias.refetch();
            dispatch(
              showSnackbar(
                t("PAGES.CATEGORIAS.SNACK_BARS.DEACTIVATE"),
                "success"
              )
            );
          },
        }
      );
    }
    handleToggleModalInativar();
  }

  function handleToggleModalInativar() {
    setCategoria(undefined);
    setToggleModalInativar((prevState) => !prevState);
  }

  return {
    categoria,
    toggleModalInativar,
    handleToggleModalInativar,
    handleInativar,
  };
};

export default useModalInativar;
