import { useForm, UseFormReturn } from "react-hook-form";
import { BreadcrumbItem, Conta, ContaCreateAndUpdatePayload } from "@/types";
import { useLoading } from "@/hooks/useLoading";
import { useNotification } from "@/hooks/useNotification";
import { postConta } from "@/api/Contas/postConta";
import { useNavigate, useParams } from "react-router-dom";
import * as PATHS from "@/routes/paths";
import { useQuery } from "@tanstack/react-query";
import { queryOptionsGetContaById } from "@/api/Contas/utils/queryOptionsGetContaById";
import { useEffect } from "react";
import { usePageMode } from "@/hooks/usePageMode";
import { ContaForm } from "../types";
import { useUrlParams } from "@/hooks/useUrlParams";

interface IUseCadastroReturn {
  breadcrumbs: BreadcrumbItem[];
  contaForm: UseFormReturn<ContaForm>;
  isDisabledForm: boolean;
  pageTitle: string;
  handleBack(): void;
  submitContaForm(): void;
}

export const useCadastro = (): IUseCadastroReturn => {
  const contaForm = useForm<ContaForm>();

  const loading = useLoading();

  const notification = useNotification();

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { mode } = usePageMode();

  const { getSearchString } = useUrlParams();

  const queryGetContaById = useQuery({
    ...queryOptionsGetContaById(id as string),
    enabled: Boolean(id),
  });

  const isDisabledForm = mode === "view";

  const pageTitle =
    mode === "create" ? "Nova" : `Conta ${queryGetContaById.data?.id}`;

  const breadcrumbs = buildBreadcrumbs();

  useEffect(() => {
    if (queryGetContaById.data && !queryGetContaById.isFetching) {
      (Object.keys(queryGetContaById.data) as (keyof Conta)[]).forEach(
        (key) => {
          contaForm.setValue(
            key as keyof ContaCreateAndUpdatePayload,
            queryGetContaById.data[key] as Conta[keyof Conta]
          );
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryGetContaById.data, queryGetContaById.isFetching]);

  useEffect(() => {
    loading.setLoading(queryGetContaById.isFetching);
  }, [queryGetContaById.isFetching]);

  function buildBreadcrumbs(): BreadcrumbItem[] {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Contas", to: PATHS.CONTAS.LISTAGEM },
    ];

    if (queryGetContaById.isFetching) return breadcrumbs;

    if (mode === "create") {
      return [...breadcrumbs, { label: "Nova" }];
    }

    if (!queryGetContaById.data?.id) return breadcrumbs;

    const contaBreadcrumb: BreadcrumbItem = {
      label: `Conta ${queryGetContaById.data?.id}`,
      to: PATHS.CONTAS.VIEW.replace(":id", String(queryGetContaById.data?.id)),
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
    navigate(`${PATHS.CONTAS.LISTAGEM}${search}`);
  }

  function submitContaForm(): void {
    contaForm.handleSubmit(
      async (data) => {
        try {
          loading.setLoading(true);

          const payload: ContaCreateAndUpdatePayload = {
            id: data.id ?? undefined,
            nome: data.nome,
            tipoConta: data.tipoConta,
            agencia: data.agencia ?? "",
            conta: data.conta ?? "",
            observacao: data.observacao ?? "",
            incluirEmSomas: data.incluirEmSomas,
            ativo: true,
          };

          await postConta(payload);

          notification.showSnackBar(
            `Conta ${payload.id ? "editada" : "adicionada"} com sucesso!`,
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
    contaForm,
    pageTitle,
    isDisabledForm,
    handleBack,
    submitContaForm,
  };
};
