import { useForm, UseFormReturn } from "react-hook-form";
import {
  BreadcrumbItem,
  Categoria,
  CategoriaCreateAndUpdatePayload,
  PageMode,
} from "@/types";
import { useLoading } from "@/hooks/useLoading";
import { useNotification } from "@/hooks/useNotification";
import { useNavigate, useParams } from "react-router-dom";
import * as PATHS from "@/routes/paths";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { usePageMode } from "@/hooks/usePageMode";
import { queryOptionsGetCategoriaById } from "@/api/Categorias/utils/queryOptionsGetCategoriaById";
import { postCategoria } from "@/api/Categorias/postCategoria";
import { useUrlParams } from "@/hooks/useUrlParams";

interface UseCadastroReturn {
  breadcrumbs: BreadcrumbItem[];
  categoriaForm: UseFormReturn<CategoriaCreateAndUpdatePayload>;
  isDisabledForm: boolean;
  mode: PageMode;
  pageTitle: string;
  handleBack(): void;
  submitCategoriaForm(): void;
}

export const useCadastro = (): UseCadastroReturn => {
  const categoriaForm = useForm<CategoriaCreateAndUpdatePayload>();

  const loading = useLoading();

  const notification = useNotification();

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { mode } = usePageMode();

  const { getSearchString } = useUrlParams();

  const queryGetCategoriaById = useQuery({
    ...queryOptionsGetCategoriaById(id as string),
    enabled: Boolean(id),
  });

  const isDisabledForm = mode === "view";

  const pageTitle =
    mode === "create" ? "Nova" : `Categoria ${queryGetCategoriaById.data?.id}`;

  const breadcrumbs = buildBreadcrumbs();

  useEffect(() => {
    if (queryGetCategoriaById.data && !queryGetCategoriaById.isFetching) {
      (Object.keys(queryGetCategoriaById.data) as (keyof Categoria)[]).forEach(
        (key) => {
          categoriaForm.setValue(
            key as keyof CategoriaCreateAndUpdatePayload,
            queryGetCategoriaById.data[key] as Categoria[keyof Categoria]
          );
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryGetCategoriaById.data, queryGetCategoriaById.isFetching]);

  useEffect(() => {
    loading.setLoading(queryGetCategoriaById.isFetching);
  }, [queryGetCategoriaById.isFetching]);

  function buildBreadcrumbs(): BreadcrumbItem[] {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Categorias", to: PATHS.CATEGORIAS.LISTAGEM },
    ];

    if (queryGetCategoriaById.isFetching) return breadcrumbs;

    if (mode === "create") {
      return [...breadcrumbs, { label: "Nova" }];
    }

    if (!queryGetCategoriaById.data?.id) return breadcrumbs;

    const contaBreadcrumb: BreadcrumbItem = {
      label: `Categoria ${queryGetCategoriaById.data?.id}`,
      to: PATHS.CATEGORIAS.VIEW.replace(
        ":id",
        String(queryGetCategoriaById.data?.id)
      ),
    };

    if (mode === "edit") {
      return [...breadcrumbs, contaBreadcrumb, { label: "Editar" }];
    }

    if (mode === "view") {
      return [...breadcrumbs, { ...contaBreadcrumb, to: undefined }];
    }

    return breadcrumbs;
  }

  function handleBack(): void {
    const search = getSearchString();
    navigate(`${PATHS.CATEGORIAS.LISTAGEM}${search}`);
  }

  function submitCategoriaForm(): void {
    categoriaForm.handleSubmit(
      async (data) => {
        try {
          loading.setLoading(true);

          const payload: CategoriaCreateAndUpdatePayload = {
            ...data,
            id: data.id ?? undefined,
            tipoMovimentacao: data.tipoMovimentacao,
            observacao: data.observacao ?? "",
            ativo: true,
          };

          await postCategoria(payload);

          notification.showSnackBar(
            `Categoria ${payload.id ? "editada" : "adicionada"} com sucesso!`,
            "success"
          );

          handleBack();
        } catch (error) {
          console.error(error);
        } finally {
          loading.setLoading(false);
        }
      },
      () => {
        notification.showSnackBar(
          "Existem campos obrigatórios não preenchidos!",
          "error"
        );
      }
    )();
  }

  return {
    breadcrumbs,
    categoriaForm,
    pageTitle,
    mode,
    isDisabledForm,
    handleBack,
    submitCategoriaForm,
  };
};
