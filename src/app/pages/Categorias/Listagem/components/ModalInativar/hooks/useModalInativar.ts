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
  openModalInativar: boolean;
  toggleModalInativar: () => void;
  handleInativar: () => void;
}

const useModalInativar = (): IUseModalInativar => {
  const {
    categoria,
    queryGetCategorias,
    openModalInativar,
    setCategoria,
    setOpenModalInativar,
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
    toggleModalInativar();
  }

  function toggleModalInativar() {
    setCategoria(undefined);
    setOpenModalInativar((prevState) => !prevState);
  }

  return {
    categoria,
    openModalInativar,
    toggleModalInativar,
    handleInativar,
  };
};

export default useModalInativar;
