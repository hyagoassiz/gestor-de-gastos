import { useForm, UseFormReturn } from "react-hook-form";
import { useLoading } from "../../../../../../hooks/useLoading";
import { useNotification } from "../../../../../../hooks/useNotification";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { postTransacao } from "../../../../../../api/Transacao/postTransacao";
import { KEY_GET_TRANSACOES_PAGINADO } from "../../../../../../api/Transacao/utils/queryOptionsGetTransacoesPaginado";
import { queryOptionsGetContas } from "../../../../../../api/Contas/utils/queryOptionsGetContas";
import { queryOptionsGetCategorias } from "../../../../../../api/Categorias/utils/queryOptionsGetCategorias";
import {
  Categoria,
  Conta,
  Transacao,
  TransacaoCreateAndUpdatePayload,
} from "@/types";

interface IUseModalTransacao {
  isDuplicar: boolean;
  transacao: Transacao | null;
  onClose(): void;
}

interface IUseModalContaReturn {
  contas: Conta[] | undefined;
  categorias: Categoria[] | undefined;
  transacaoForm: UseFormReturn<TransacaoCreateAndUpdatePayload>;
  submitContaForm(): void;
}

export const useModalTransacao = ({
  transacao,
  isDuplicar,
  onClose,
}: IUseModalTransacao): IUseModalContaReturn => {
  const transacaoForm = useForm<TransacaoCreateAndUpdatePayload>();

  const loading = useLoading();

  const notification = useNotification();

  const queryClient = useQueryClient();

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

  const contas = queryGetContas.data;

  const categorias = useQueryGetCategorias.data;

  useEffect(() => {
    if (transacao) {
      (Object.keys(transacao) as (keyof Transacao)[]).forEach((key) => {
        transacaoForm.setValue(
          key as keyof TransacaoCreateAndUpdatePayload,
          transacao[key] as Transacao[keyof Transacao]
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transacao]);

  function submitContaForm(): void {
    transacaoForm.handleSubmit(
      async (data) => {
        try {
          loading.setLoading(true);

          const payload: TransacaoCreateAndUpdatePayload = {
            id: !isDuplicar ? data.id : undefined,
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

          queryClient.invalidateQueries({
            queryKey: [KEY_GET_TRANSACOES_PAGINADO],
          });

          onClose();
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
    contas,
    categorias,
    transacaoForm,
    submitContaForm,
  };
};
