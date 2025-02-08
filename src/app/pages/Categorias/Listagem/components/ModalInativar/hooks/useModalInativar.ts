import { useContext, useEffect } from "react";
import { CategoriasContext } from "../../../context";
import { categoriasService } from "../../../../../../shared/services/categorias";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";
import { useTranslation } from "react-i18next";
import { setLoading } from "../../../../../../shared/redux/loading/actions";

interface IUseModalInativar {
  openModalInativar: boolean;
  handleInativarCategoria(): void;
  toggleModalInativar(): void;
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

  function handleInativarCategoria(): void {
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

  function toggleModalInativar(): void {
    setCategoria(undefined);
    setOpenModalInativar((prevState) => !prevState);
  }

  return {
    openModalInativar,
    handleInativarCategoria,
    toggleModalInativar,
  };
};

export default useModalInativar;
