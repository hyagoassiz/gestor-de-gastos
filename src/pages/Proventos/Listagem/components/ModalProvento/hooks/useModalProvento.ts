import { useForm, UseFormReturn } from "react-hook-form";
import { useLoading } from "../../../../../../hooks/useLoading";
import { useNotification } from "../../../../../../hooks/useNotification";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TProventoForm } from "../interfaces";
import { postProvento } from "../../../../../../api/Proventos/postProvento";
import { KEY_GET_PROVENTOS } from "../../../../../../api/Proventos/utils/getQueryOptionsGetProventos";
import { getQueryOptionsGetAtivos } from "../../../../../../api/Ativos/utils/getQueryOptionsGetAtivos";

interface IUseModalProventoProps {
  provento: IProventoResponseApi | null;
  isDuplicating: boolean;
  onClose(): void;
}

interface IUseModalProventoReturn {
  ativos: IAtivoResponseApi[] | undefined;
  proventosForm: UseFormReturn<TProventoForm>;
  submiTProventoForm(): void;
}

export const useModalProvento = ({
  provento,
  isDuplicating,
  onClose,
}: IUseModalProventoProps): IUseModalProventoReturn => {
  const proventosForm = useForm<TProventoForm>();

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
    if (provento) {
      (Object.keys(provento) as (keyof IProventoResponseApi)[]).forEach(
        (key) => {
          proventosForm.setValue(
            key as keyof TProventoForm,
            provento[key] as IProventoResponseApi[keyof IProventoResponseApi]
          );
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provento]);

  function submiTProventoForm(): void {
    proventosForm.handleSubmit(
      async (data) => {
        try {
          setLoading(true);

          const now = dayjs().toISOString();

          const payload: IProventoPayloadApi = {
            id: isDuplicating ? undefined : data.id ?? undefined,
            dataPagamento: data.dataPagamento,
            tipoProventoId: data.tipoProvento.id,
            ativoId: data.ativo.id,
            quantidade: data.quantidade,
            precoUnitario: data.precoUnitario,
            total: data.total,
            observacao: data.observacao ?? "",
            createdAt: data.createdAt ?? now,
            updatedAt: data.id ? now : "",
          };

          await postProvento(payload);

          showSnackBar(
            `Provento ${payload.id ? "editado" : "adicionado"} com sucesso!`,
            "success"
          );

          queryClient.invalidateQueries({ queryKey: [KEY_GET_PROVENTOS] });

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
    proventosForm,
    submiTProventoForm,
  };
};
