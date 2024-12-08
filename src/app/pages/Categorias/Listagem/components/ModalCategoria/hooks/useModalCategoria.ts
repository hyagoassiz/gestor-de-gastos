import { useContext, useEffect } from "react";
import { CategoriasContext } from "../../../context";
import { ICategoria, TypeCategoria } from "../../../../../../shared/interfaces";
import { useForm, UseFormReturn } from "react-hook-form";
import { categoriasService } from "../../../../../../shared/services/categorias";
import {
  ICategoriaForm,
  IPayloadPersistirCategoria,
} from "../../../interfaces";
import { IResponseCategoria } from "../../../../../../shared/services/categorias/interfaces";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";

interface IModalCategoria {
  categoriaForm: UseFormReturn<ICategoriaForm>;
  categoria: IResponseCategoria | undefined;
  options: TypeCategoria[];
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

  const options: TypeCategoria[] = ["Entrada", "Saída"];

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
  }, [toggleModalCategoria, categoria, categoriaForm]);

  function onSubmit() {
    categoriaForm.handleSubmit(async (data) => {
      const payload: IPayloadPersistirCategoria = {
        id: data.id ?? undefined,
        nome: data.nome,
        tipo: data.tipo,
        ativo: true,
      };
      mutatePersistirCategoria(
        { payload },
        {
          onSuccess: () => {
            queryGetCategorias.refetch();
            handleToggleModalCategoria();
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
    options,
    toggleModalCategoria,
    handleToggleModalCategoria,
    onSubmit,
  };
};

export default useModalCategoria;
