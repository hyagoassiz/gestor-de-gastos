import { useForm, UseFormReturn } from "react-hook-form";
import {
  BreadcrumbItem,
  Objetivo,
  ObjetivoCreateAndUpdatePayload,
} from "@/types";
import { useLoading } from "@/hooks/useLoading";
import { useNavigate, useParams } from "react-router-dom";
import * as PATHS from "@/routes/paths";
import { useEffect } from "react";
import { usePageMode } from "@/hooks/usePageMode";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useNotification } from "@/hooks/useNotification";
import { useMutationCriarObjetivo } from "@/services/objetivos/objetivos.hooks";
import { useQueryObterObjetivoById } from "@/services/objetivos/hooks/useQueryObterObjetivoById";

interface UseCadastroReturn {
  breadcrumbs: BreadcrumbItem[];
  objetivoForm: UseFormReturn<ObjetivoCreateAndUpdatePayload>;
  pageTitle: string;
  handleBack(): void;
  handleSalvar(): void;
}

export const useCadastro = (): UseCadastroReturn => {
  const objetivoForm = useForm<ObjetivoCreateAndUpdatePayload>();

  const loading = useLoading();

  const navigate = useNavigate();

  const { id: idObjetivo } = useParams<{ id: string }>();

  const pageMode = usePageMode();

  const notification = useNotification();

  const { getSearchString } = useUrlParams();

  const mutationCriarObjetivo = useMutationCriarObjetivo();

  const queryGetObjetivoById = useQueryObterObjetivoById(Number(idObjetivo));

  const pageTitle =
    pageMode.mode === "create"
      ? "Novo"
      : `Objetivo ${queryGetObjetivoById.data?.id}`;

  const breadcrumbs = buildBreadcrumbs();

  useEffect(() => {
    if (queryGetObjetivoById.data && !queryGetObjetivoById.isFetching) {
      (Object.keys(queryGetObjetivoById.data) as (keyof Objetivo)[]).forEach(
        (key) => {
          objetivoForm.setValue(
            key as keyof ObjetivoCreateAndUpdatePayload,
            queryGetObjetivoById.data[key] as Objetivo[keyof Objetivo]
          );
        }
      );
    }
  }, [queryGetObjetivoById.data, queryGetObjetivoById.isFetching]);

  useEffect(() => {
    loading.setLoading(queryGetObjetivoById.isFetching);
  }, [queryGetObjetivoById.isFetching]);

  function buildBreadcrumbs(): BreadcrumbItem[] {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Objetivos", to: PATHS.OBJETIVOS.LISTAGEM },
    ];

    if (queryGetObjetivoById.isFetching) return breadcrumbs;

    if (pageMode.mode === "create") {
      return [...breadcrumbs, { label: "Nova" }];
    }

    if (!queryGetObjetivoById.data?.id) return breadcrumbs;

    const transacaoBreadcrumb: BreadcrumbItem = {
      label: `Objetivo ${queryGetObjetivoById.data?.id}`,
      to: PATHS.OBJETIVOS.VIEW.replace(
        ":id",
        String(queryGetObjetivoById.data?.id)
      ),
    };

    if (pageMode.mode === "edit") {
      return [...breadcrumbs, transacaoBreadcrumb, { label: "Editar" }];
    }

    if (pageMode.mode === "view") {
      return [...breadcrumbs, { ...transacaoBreadcrumb, to: undefined }];
    }

    return breadcrumbs;
  }

  function handleBack(): void {
    const search = getSearchString();
    navigate(`${PATHS.OBJETIVOS.LISTAGEM}${search}`);
  }

  function handleSalvar(): void {
    objetivoForm.handleSubmit(
      (data) => {
        const payload: ObjetivoCreateAndUpdatePayload = {
          ...data,
        };

        mutationCriarObjetivo.mutate(payload);
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
    objetivoForm,
    pageTitle,
    handleBack,
    handleSalvar,
  };
};
