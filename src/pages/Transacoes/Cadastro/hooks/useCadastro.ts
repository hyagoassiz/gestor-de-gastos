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
import { useEffect } from "react";
import { usePageMode } from "@/hooks/usePageMode";
import { useUrlParams } from "@/hooks/useUrlParams";
import { EnumTipoMovimentacao } from "@/types/enums";
import { useQueryListarContas } from "@/services/contas/contas.hooks";
import { useQueryListarCategorias } from "@/services/categorias/categorias.hooks";
import {
  useMutationCriarTransacao,
  useQueryObterTransacaoById,
} from "@/services/transacoes/transacoes.hooks";

interface UseCadastroReturn {
  breadcrumbs: BreadcrumbItem[];
  contas: Conta[] | undefined;
  categorias: Categoria[] | undefined;
  transacaoForm: UseFormReturn<TransacaoCreateAndUpdatePayload>;
  isDisabledForm: boolean;
  pageTitle: string;
  handleBack(): void;
  handleTipoMovimentacaoChange(
    tipoMovimentacao: keyof typeof EnumTipoMovimentacao | null
  ): void;
  submitTransacaoForm(): void;
}

export const useCadastro = (): UseCadastroReturn => {
  const transacaoForm = useForm<TransacaoCreateAndUpdatePayload>();

  const loading = useLoading();

  const notification = useNotification();

  const navigate = useNavigate();

  const { id: idTransacao } = useParams<{ id: string }>();

  const pageMode = usePageMode();

  const { getSearchString } = useUrlParams();

  const shouldEnableCadastroQueries =
    pageMode.mode !== "view" &&
    Boolean(transacaoForm.watch("tipoMovimentacao"));

  const mutationCriarTransacao = useMutationCriarTransacao();

  const queryObeterTransacaoById = useQueryObterTransacaoById(
    Number(idTransacao)
  );

  const queryListarContas = useQueryListarContas(
    { ativo: true },
    { enabled: shouldEnableCadastroQueries }
  );

  const queryListarCategorias = useQueryListarCategorias(
    {
      ativo: true,
      tipoMovimentacao: transacaoForm.watch("tipoMovimentacao"),
      padrao: false,
    },
    { enabled: shouldEnableCadastroQueries }
  );

  const contas = queryListarContas.data;

  const categorias = queryListarCategorias.data;

  const isDisabledForm = pageMode.mode === "view";

  const pageTitle =
    pageMode.mode === "create"
      ? "Nova"
      : `Conta ${queryObeterTransacaoById.data?.id}`;

  const breadcrumbs = buildBreadcrumbs();

  useEffect(() => {
    if (queryObeterTransacaoById.data && !queryObeterTransacaoById.isFetching) {
      (
        Object.keys(queryObeterTransacaoById.data) as (keyof Transacao)[]
      ).forEach((key) => {
        transacaoForm.setValue(
          key as keyof TransacaoCreateAndUpdatePayload,
          queryObeterTransacaoById.data[key] as Transacao[keyof Transacao]
        );
      });
    }
  }, [queryObeterTransacaoById.data, queryObeterTransacaoById.isFetching]);

  useEffect(() => {
    loading.setLoading(queryObeterTransacaoById.isFetching);
  }, [queryObeterTransacaoById.isFetching]);

  function buildBreadcrumbs(): BreadcrumbItem[] {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Transações", to: PATHS.TRANSACOES.LIST },
    ];

    if (queryObeterTransacaoById.isFetching) return breadcrumbs;

    if (pageMode.mode === "create") {
      return [...breadcrumbs, { label: "Nova" }];
    }

    if (!queryObeterTransacaoById.data?.id) return breadcrumbs;

    const transacaoBreadcrumb: BreadcrumbItem = {
      label: `Transação ${queryObeterTransacaoById.data?.id}`,
      to: PATHS.TRANSACOES.VIEW.replace(
        ":id",
        String(queryObeterTransacaoById.data?.id)
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
    navigate(`${PATHS.TRANSACOES.LIST}${search}`);
  }

  function handleTipoMovimentacaoChange(
    tipoMovimentacao: keyof typeof EnumTipoMovimentacao | null
  ): void {
    transacaoForm.setValue("tipoMovimentacao", tipoMovimentacao);

    if (transacaoForm.getValues("categoria")?.id) {
      transacaoForm.setValue("categoria", null);
    }

    if (transacaoForm.getValues("situacao")) {
      transacaoForm.setValue("situacao", null);
    }
  }

  function submitTransacaoForm(): void {
    transacaoForm.handleSubmit(
      async (data) => {
        const payload: TransacaoCreateAndUpdatePayload = {
          id: data.id ?? undefined,
          tipoMovimentacao: data.tipoMovimentacao,
          data: data.data,
          valor: data.valor,
          categoria: data.categoria,
          conta: data.conta,
          observacao: data.observacao,
          situacao: data.situacao,
        };

        mutationCriarTransacao.mutate(payload);
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
    handleTipoMovimentacaoChange,
    submitTransacaoForm,
  };
};
