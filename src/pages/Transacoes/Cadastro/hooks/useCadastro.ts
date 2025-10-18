import { useForm, UseFormReturn } from "react-hook-form";
import {
  BreadcrumbItem,
  Categoria,
  Conta,
  Transacao,
  TransacaoCreateAndUpdatePayload,
} from "@/types";
import { useLoading } from "@/hooks/useLoading";
import { useNotification } from "@/hooks/useNotification";
import { useNavigate, useParams } from "react-router-dom";
import * as PATHS from "@/routes/paths";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { usePageMode } from "@/hooks/usePageMode";
import { queryOptionsGetTransacaoById } from "@/api/Transacao/utils/queryOptionsGetTransacaoById";
import { postTransacao } from "@/api/Transacao/postTransacao";
import { queryOptionsGetContas } from "@/api/Contas/utils/queryOptionsGetContas";
import { queryOptionsGetCategorias } from "@/api/Categorias/utils/queryOptionsGetCategorias";
import { useUrlParams } from "@/hooks/useUrlParams";

interface IUseCadastroReturn {
  breadcrumbs: BreadcrumbItem[];
  contas: Conta[] | undefined;
  categorias: Categoria[] | undefined;
  transacaoForm: UseFormReturn<TransacaoCreateAndUpdatePayload>;
  isDisabledForm: boolean;
  pageTitle: string;
  handleBack(): void;
  submitTransacaoForm(): void;
}

export const useCadastro = (): IUseCadastroReturn => {
  const transacaoForm = useForm<TransacaoCreateAndUpdatePayload>();

  const loading = useLoading();

  const notification = useNotification();

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { mode } = usePageMode();

  const { getSearchString } = useUrlParams();

  const queryGetTransacaoById = useQuery({
    ...queryOptionsGetTransacaoById(Number(id)),
    enabled: Boolean(id),
  });

  const queryGetContas = useQuery({
    ...queryOptionsGetContas({ ativo: true }),
  });

  const useQueryGetCategorias = useQuery({
    enabled: Boolean(transacaoForm.watch("tipoMovimentacao")),
    ...queryOptionsGetCategorias({
      ativo: true,
      tipoMovimentacao: transacaoForm.watch("tipoMovimentacao"),
    }),
  });

  const isDisabledForm = mode === "view";

  const pageTitle =
    mode === "create" ? "Nova" : `Conta ${queryGetTransacaoById.data?.id}`;

  const breadcrumbs = buildBreadcrumbs();

  const contas = queryGetContas.data;

  const categorias = useQueryGetCategorias.data;

  useEffect(() => {
    if (queryGetTransacaoById.data && !queryGetTransacaoById.isFetching) {
      (Object.keys(queryGetTransacaoById.data) as (keyof Transacao)[]).forEach(
        (key) => {
          transacaoForm.setValue(
            key as keyof TransacaoCreateAndUpdatePayload,
            queryGetTransacaoById.data[key] as Transacao[keyof Transacao]
          );
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryGetTransacaoById.data, queryGetTransacaoById.isFetching]);

  useEffect(() => {
    loading.setLoading(queryGetTransacaoById.isFetching);
  }, [queryGetTransacaoById.isFetching]);

  function buildBreadcrumbs(): BreadcrumbItem[] {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Transações", to: PATHS.TRANSACOES.LIST },
    ];

    if (queryGetTransacaoById.isFetching) return breadcrumbs;

    if (mode === "create") {
      return [...breadcrumbs, { label: "Nova" }];
    }

    if (!queryGetTransacaoById.data?.id) return breadcrumbs;

    const transacaoBreadcrumb: BreadcrumbItem = {
      label: `Transação ${queryGetTransacaoById.data?.id}`,
      to: PATHS.TRANSACOES.VIEW.replace(
        ":id",
        String(queryGetTransacaoById.data?.id)
      ),
    };

    if (mode === "edit") {
      return [...breadcrumbs, transacaoBreadcrumb, { label: "Editar" }];
    }

    if (mode === "view") {
      return [...breadcrumbs, { ...transacaoBreadcrumb, to: undefined }];
    }

    return breadcrumbs;
  }

  function handleBack(): void {
    const search = getSearchString();
    navigate(`${PATHS.TRANSACOES.LIST}${search}`);
  }

  function submitTransacaoForm(): void {
    transacaoForm.handleSubmit(
      async (data) => {
        try {
          loading.setLoading(true);

          const payload: TransacaoCreateAndUpdatePayload = {
            id: data.id ?? undefined,
            tipoMovimentacao: data.tipoMovimentacao,
            data: data.data,
            valor: data.valor,
            categoria: data.categoria,
            conta: data.conta,
            observacao: data.observacao,
            pago: data.pago,
          };

          await postTransacao(payload);

          notification.showSnackBar(
            `Transação ${payload.id ? "editada" : "adicionada"} com sucesso!`,
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
    categorias,
    contas,
    transacaoForm,
    pageTitle,
    isDisabledForm,
    handleBack,
    submitTransacaoForm,
  };
};
