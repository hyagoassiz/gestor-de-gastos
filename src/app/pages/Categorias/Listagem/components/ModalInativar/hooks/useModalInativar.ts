import { useContext } from "react";
import { CategoriasContext } from "../../../context";
import { ICategoria } from "../../../../../../shared/interfaces";
import { categoriasService } from "../../../../../../shared/services/categorias";

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

  const { mutate: mutateAlterarSituacaoCategoria } =
    categoriasService.useMutationAlterarSituacaoCategoria();

  function handleInativar() {
    if (categoria) {
      mutateAlterarSituacaoCategoria(
        {
          payload: { id: categoria.id, ativo: false },
        },
        { onSuccess: () => queryGetCategorias.refetch() }
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
