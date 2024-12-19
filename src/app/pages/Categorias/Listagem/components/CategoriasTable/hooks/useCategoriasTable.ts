import { useContext, useMemo } from "react";
import { CategoriasContext } from "../../../context";
import { IResponseCategoria } from "../../../../../../shared/services/categorias/interfaces";
import { categoriasService } from "../../../../../../shared/services/categorias";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

interface IUseCategoriasTable {
  categorias: IResponseCategoria[] | undefined;
  badgeCount: number;
  handleToggleFiltro: () => void;
  handleInativar: (categoria: IResponseCategoria) => void;
  handleAdicionar: () => void;
  handleEditar: (categoria: IResponseCategoria) => void;
  handleAtivar: (categoria: IResponseCategoria) => void;
}

const useCategoriasTable = (): IUseCategoriasTable => {
  const {
    categorias,
    setToggleFiltro,
    setCategoria,
    setToggleModalInativar,
    setToggleModalCategoria,
    queryGetCategorias,
    filtroData,
  } = useContext(CategoriasContext);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { mutate: mutateAlterarSituacaoCategoria } =
    categoriasService.useMutationAlterarSituacaoCategoria();

  const badgeCount: number = useMemo(() => {
    const tipo = filtroData.tipo?.length || 0;
    const ativo = filtroData.ativo.some((_ativo) => _ativo === false) ? 1 : 0;
    return tipo + ativo;
  }, [JSON.stringify(filtroData)]);

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

  function handleAdicionar() {
    setToggleModalCategoria((prevState) => !prevState);
  }

  function handleEditar(categoria: IResponseCategoria) {
    setToggleModalCategoria((prevState) => !prevState);
    setCategoria(categoria);
  }

  function handleInativar(categoria: IResponseCategoria) {
    setCategoria(categoria);
    setToggleModalInativar((prevState) => !prevState);
  }

  function handleToggleFiltro() {
    setToggleFiltro((prevToggle) => !prevToggle);
  }

  return {
    categorias,
    badgeCount,
    handleToggleFiltro,
    handleInativar,
    handleAdicionar,
    handleEditar,
    handleAtivar,
  };
};

export default useCategoriasTable;
