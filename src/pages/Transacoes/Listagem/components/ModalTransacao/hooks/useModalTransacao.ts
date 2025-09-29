import { useForm, UseFormReturn } from "react-hook-form";
import { useLoading } from "../../../../../../hooks/useLoading";
import { useNotification } from "../../../../../../hooks/useNotification";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ITransacaoForm } from "../interfaces";
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
  transacao: Transacao | null;
  onClose(): void;
}

interface IUseModalContaReturn {
  contas: Conta[] | undefined;
  categorias: Categoria[] | undefined;
  transacaoForm: UseFormReturn<ITransacaoForm>;
  submitContaForm(): void;
}

export const useModalTransacao = ({
  transacao,
  onClose,
}: IUseModalTransacao): IUseModalContaReturn => {
  const transacaoForm = useForm<ITransacaoForm>();

  const loading = useLoading();

  const notification = useNotification();

  const queryClient = useQueryClient();

  const useQueryGetContas = useQuery({
    ...queryOptionsGetContas({ ativo: true }),
  });

  const useQueryGetCategorias = useQuery({
    ...queryOptionsGetCategorias({ ativo: true }),
  });

  const contas = useQueryGetContas.data;

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
            id: data.id ?? undefined,
            tipoMovimentacao: data.tipoMovimentacao.id,
            data: data.data,
            valor: data.valor,
            categoria: { id: data.categoria.id },
            conta: { id: data.conta.id },
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
