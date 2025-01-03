import { useContext, useEffect } from "react";
import { CategoriasContext } from "../../../context";
import { ICategoria } from "../../../../../../shared/interfaces";
import { useForm, UseFormReturn } from "react-hook-form";
import { categoriasService } from "../../../../../../shared/services/categorias";
import { ICategoriaForm } from "../../../interfaces";
import {
  IPayloadPersistirCategoria,
  IResponseCategoria,
} from "../../../../../../shared/services/categorias/interfaces";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";

interface IModalCategoria {
  categoriaForm: UseFormReturn<ICategoriaForm>;
  categoria: IResponseCategoria | undefined;
  toggleModalCategoria: boolean;
  handleToggleModalCategoria: () => void;
  onSubmit(): void;
}
const useModalCategoria = (): IModalCategoria => {
  const {
    toggleModalCategoria,
    setToggleModalCategoria,
    setCategoria,
    categoria,
    queryGetCategorias,
  } = useContext(CategoriasContext);

  const categoriaForm = useForm<ICategoriaForm>();

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { mutate: mutatePersistirCategoria } =
    categoriasService.useMutationPersistirCategoria();

  useEffect(() => {
    if (categoria?.id && toggleModalCategoria) {
      (Object.keys(categoria) as (keyof ICategoria)[]).forEach((key) => {
        categoriaForm.setValue(
          key as keyof ICategoria,
          categoria[key] as ICategoria[keyof ICategoria]
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleModalCategoria, categoria]);

  function onSubmit() {
    categoriaForm.handleSubmit(async (data) => {
      const payload: IPayloadPersistirCategoria = {
        id: data.id ?? undefined,
        nome: data.nome,
        tipo: data.tipo,
        ativo: true,
      };
      handleToggleModalCategoria();
      mutatePersistirCategoria(
        { payload: payload },
        {
          onSuccess: () => {
            queryGetCategorias.refetch();
            dispatch(
              showSnackbar(
                !payload.id
                  ? t("PAGES.CATEGORIAS.SNACK_BARS.CATEGORIA_CREATE")
                  : t("PAGES.CATEGORIAS.SNACK_BARS.CATEGORIA_EDIT"),
                "success"
              )
            );
          },
        }
      );
    })();
  }

  function handleToggleModalCategoria() {
    setToggleModalCategoria((prevState) => !prevState);
    setCategoria(undefined);
    categoriaForm.reset();
  }

  return {
    categoriaForm,
    categoria,
    toggleModalCategoria,
    handleToggleModalCategoria,
    onSubmit,
  };
};

export default useModalCategoria;
