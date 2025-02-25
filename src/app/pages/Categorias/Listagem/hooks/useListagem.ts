import { useContext, useEffect, useMemo } from "react";
import { CategoriasContext } from "../context";
import { ICategoria, ISeachBar } from "../../../../shared/interfaces";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { categoriasService } from "../../../../shared/services/categorias";
import { setLoading } from "../../../../shared/redux/loading/actions";
import { showSnackbar } from "../../../../shared/redux/snackBar/actions";

interface IListagem {
  categorias: ICategoria[] | undefined;
  searchBar: ISeachBar;
  badgeCount: number;
  handleAdicionarCategoria(): void;
  handleAtivarCategoria(categoria: ICategoria): void;
  handleEditarCategoria(categoria: ICategoria): void;
  handleInativarCategoria(categoria: ICategoria): void;
  toggleFiltro(): void;
}

const useListagem = (): IListagem => {
  const {
    categorias,
    filtroData,
    queryGetCategorias,
    searchBar,
    setCategoria,
    setOpenModalCategoria,
    setOpenFiltro,
    setOpenModalInativar,
  } = useContext(CategoriasContext);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const badgeCount: number = useMemo(() => {
    const tipo = filtroData.tipo?.length || 0;
    const ativo = filtroData.ativo.some((_ativo) => _ativo === false) ? 1 : 0;
    return tipo + ativo;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filtroData)]);

  const { mutate: mutateAlterarSituacaoCategoria, isPending } =
    categoriasService.useMutationAlterarSituacaoCategoria();

  useEffect(() => {
    dispatch(setLoading(isPending));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  function handleAdicionarCategoria(): void {
    setOpenModalCategoria((prevState) => !prevState);
  }

  function handleAtivarCategoria(categoria: ICategoria): void {
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

  function handleEditarCategoria(categoria: ICategoria): void {
    setOpenModalCategoria((prevState) => !prevState);
    setCategoria(categoria);
  }

  function handleInativarCategoria(categoria: ICategoria): void {
    setCategoria(categoria);
    setOpenModalInativar((prevState) => !prevState);
  }

  function toggleFiltro(): void {
    setOpenFiltro((prevToggle) => !prevToggle);
  }

  return {
    categorias,
    searchBar,
    badgeCount,
    handleAdicionarCategoria,
    handleAtivarCategoria,
    handleEditarCategoria,
    handleInativarCategoria,
    toggleFiltro,
  };
};

export default useListagem;
