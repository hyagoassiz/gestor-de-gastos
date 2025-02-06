import { useContext, useEffect } from "react";
import { CategoriasContext } from "../../../context";
import { ICategoria } from "../../../../../../shared/interfaces";
import { useForm, UseFormReturn } from "react-hook-form";
import { categoriasService } from "../../../../../../shared/services/categorias";
import { ICategoriaForm } from "../../../interfaces";
import { IPayloadPersistirCategoria } from "../../../../../../shared/services/categorias/interfaces";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";

interface IModalCategoria {
  categoriaForm: UseFormReturn<ICategoriaForm>;
  categoria: ICategoria | undefined;
  openModalCategoria: boolean;
  onSubmit(): void;
  toggleModalCategoria(): void;
}
const useModalCategoria = (): IModalCategoria => {
  const {
    categoria,
    queryGetCategorias,
    openModalCategoria,
    setCategoria,
    setOpenModalCategoria,
  } = useContext(CategoriasContext);

  const categoriaForm = useForm<ICategoriaForm>();

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { mutate: mutatePersistirCategoria } =
    categoriasService.useMutationPersistirCategoria();

  useEffect(() => {
    if (categoria?.id && openModalCategoria) {
      (Object.keys(categoria) as (keyof ICategoria)[]).forEach((key) => {
        categoriaForm.setValue(
          key as keyof ICategoriaForm,
          categoria[key] as ICategoria[keyof ICategoria]
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModalCategoria, categoria]);

  function onSubmit() {
    categoriaForm.handleSubmit(async (data) => {
      const payload: IPayloadPersistirCategoria = {
        id: data.id ?? undefined,
        nome: data.nome,
        tipo: data.tipo,
        ativo: true,
      };
      toggleModalCategoria();
      mutatePersistirCategoria(
        { payload: payload },
        {
          onSuccess: () => {
            queryGetCategorias.refetch();
            dispatch(
              showSnackbar(
                !payload.id
                  ? t("PAGES.CATEGORIAS.SNACK_BARS.CREATE")
                  : t("PAGES.CATEGORIAS.SNACK_BARS.EDIT"),
                "success"
              )
            );
          },
        }
      );
    })();
  }

  function toggleModalCategoria() {
    setOpenModalCategoria((prevState) => !prevState);
    setCategoria(undefined);
    categoriaForm.reset();
  }

  return {
    categoriaForm,
    categoria,
    openModalCategoria,
    onSubmit,
    toggleModalCategoria,
  };
};

export default useModalCategoria;
