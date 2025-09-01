import { useForm, UseFormReturn } from "react-hook-form";
import { useLoading } from "../../../../../../hooks/useLoading";
import { useNotification } from "../../../../../../hooks/useNotification";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getQueryOptionsGetAtivos } from "../../../../../../api/Ativos/utils/getQueryOptionsGetAtivos";
import { TOperacaoForm } from "../interfaces";
import { postOperacao } from "../../../../../../api/Operacoes/postOperacao";
import { KEY_GET_OPERACOES } from "../../../../../../api/Operacoes/utils/getQueryOptionsGetOperacoes";

interface IUseModalOperacaoProps {
  operacao: IOperacaoResponseApi | null;
  isDuplicating: boolean;
  onClose(): void;
}

interface IUseModalOperacaoReturn {
  ativos: IAtivoResponseApi[] | undefined;
  operacaoForm: UseFormReturn<TOperacaoForm>;
  submiTProventoForm(): void;
}

export const useModalOperacao = ({
  operacao,
  isDuplicating,
  onClose,
}: IUseModalOperacaoProps): IUseModalOperacaoReturn => {
  const operacaoForm = useForm<TOperacaoForm>();

  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryClient = useQueryClient();

  const queryGetAtivos = useQuery({
    ...getQueryOptionsGetAtivos({ ativo: true }),
  });

  const ativos = useMemo(() => {
    return queryGetAtivos.data;
  }, [queryGetAtivos.data]);

  useEffect(() => {
    if (operacao) {
      (Object.keys(operacao) as (keyof IOperacaoResponseApi)[]).forEach(
        (key) => {
          operacaoForm.setValue(
            key as keyof TOperacaoForm,
            operacao[key] as IOperacaoResponseApi[keyof IOperacaoResponseApi]
          );
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operacao]);

  function submiTProventoForm(): void {
    operacaoForm.handleSubmit(
      async (data) => {
        try {
          setLoading(true);

          const now = dayjs().toISOString();

          const payload: IOperacaoPayloadApi = {
            ...data,
            id: !isDuplicating ? data.id : undefined,
            ativoId: data.ativo.id,
            tipoOperacaoId: data.tipoOperacao.id,
            observacao: data.observacao ?? "",
            criadoEm: data.criadoEm ?? now,
            atualizadoEm: data.id ? now : "",
          };

          await postOperacao(payload);

          showSnackBar(
            `Operação ${payload.id ? "editada" : "adicionada"} com sucesso!`,
            "success"
          );

          queryClient.invalidateQueries({ queryKey: [KEY_GET_OPERACOES] });

          onClose();
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      },
      () => {
        showSnackBar("Existem campos obrigatórios não preenchidos!", "error");
      }
    )();
  }

  return {
    ativos,
    operacaoForm,
    submiTProventoForm,
  };
};
