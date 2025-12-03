import { useForm, UseFormReturn } from "react-hook-form";
import { BreadcrumbItem, Conta, ContaCreateAndUpdatePayload } from "@/types";
import { useLoading } from "@/hooks/useLoading";
import { useNotification } from "@/hooks/useNotification";
import { useNavigate, useParams } from "react-router-dom";
import * as PATHS from "@/routes/paths";
import { useEffect } from "react";
import { usePageMode } from "@/hooks/usePageMode";
import { ContaForm } from "../types";
import { useUrlParams } from "@/hooks/useUrlParams";
import {
  useMutationCriarConta,
  useQueryObterContaById,
} from "@/services/contas/contas.hooks";

interface UseCadastroReturn {
  breadcrumbs: BreadcrumbItem[];
  contaForm: UseFormReturn<ContaForm>;
  isDisabledForm: boolean;
  pageTitle: string;
  handleBack(): void;
  submitContaForm(): void;
}

export const useCadastro = (): UseCadastroReturn => {
  const contaForm = useForm<ContaForm>();

  const loading = useLoading();

  const notification = useNotification();

  const { id } = useParams<{ id: string }>();

  const { mode } = usePageMode();

  const { getSearchString } = useUrlParams();

  const navigate = useNavigate();

  const mutationCriarConta = useMutationCriarConta();

  const queryObterGetContaById = useQueryObterContaById(Number(id));

  const isDisabledForm = mode === "view";

  const pageTitle =
    mode === "create" ? "Nova" : `Conta ${queryObterGetContaById.data?.id}`;

  const breadcrumbs = buildBreadcrumbs();

  useEffect(() => {
    if (queryObterGetContaById.data) {
      (Object.keys(queryObterGetContaById.data) as (keyof Conta)[]).forEach(
        (key) => {
          contaForm.setValue(
            key as keyof ContaCreateAndUpdatePayload,
            queryObterGetContaById.data[key] as Conta[keyof Conta]
          );
        }
      );
    }
  }, [queryObterGetContaById.data]);

  useEffect(() => {
    loading.setLoading(queryObterGetContaById.isFetching);
  }, [queryObterGetContaById.isFetching]);

  function buildBreadcrumbs(): BreadcrumbItem[] {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Contas", to: PATHS.CONTAS.LISTAGEM },
    ];

    if (queryObterGetContaById.isFetching) return breadcrumbs;

    if (mode === "create") {
      return [...breadcrumbs, { label: "Nova" }];
    }

    if (!queryObterGetContaById.data?.id) return breadcrumbs;

    const contaBreadcrumb: BreadcrumbItem = {
      label: `Conta ${queryObterGetContaById.data?.id}`,
      to: PATHS.CONTAS.VIEW.replace(
        ":id",
        String(queryObterGetContaById.data?.id)
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
    navigate(`${PATHS.CONTAS.LISTAGEM}${search}`);
  }

  function submitContaForm(): void {
    contaForm.handleSubmit(
      (data) => {
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

        mutationCriarConta.mutate(payload);
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
