import { useForm, UseFormReturn } from "react-hook-form";
import { useLoading } from "../../../../../../hooks/useLoading";
import { useNotification } from "../../../../../../hooks/useNotification";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TIncomeForm } from "../interfaces";
import { postIncome } from "../../../../../../api/Income/postIncome";
import { KEY_GET_INCOME } from "../../../../../../api/Income/utils/getQueryOptionsGetIncome";
import { getQueryOptionsGetAssets } from "../../../../../../api/Assets/utils/getQueryOptionsGetAssets";

interface IUseIncomeModalProps {
  income: IIncomeResponseApi | null;
  onClose(): void;
}

interface IUseIncomeModalReturn {
  assets: IAssetResponseApi[] | undefined;
  incomeForm: UseFormReturn<TIncomeForm>;
  submitIncomeForm(): void;
}

export const useIncomeModal = ({
  income,
  onClose,
}: IUseIncomeModalProps): IUseIncomeModalReturn => {
  const incomeForm = useForm<TIncomeForm>();

  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryClient = useQueryClient();

  const queryGetAssets = useQuery({
    ...getQueryOptionsGetAssets({ ativo: true }),
  });

  const assets = useMemo(() => {
    return queryGetAssets.data;
  }, [queryGetAssets.data]);

  useEffect(() => {
    if (income) {
      (Object.keys(income) as (keyof IIncomeResponseApi)[]).forEach((key) => {
        incomeForm.setValue(
          key as keyof TIncomeForm,
          income[key] as IIncomeResponseApi[keyof IIncomeResponseApi]
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [income]);

  function submitIncomeForm(): void {
    incomeForm.handleSubmit(
      async (data) => {
        try {
          setLoading(true);

          const now = dayjs().toISOString();

          const payload: IIncomePayloadApi = {
            id: data.id ?? undefined,
            dataRecebimento: data.dataRecebimento,
            tipoProvento: data.tipoProvento,
            ativoId: data.ativo.id,
            valor: data.valor,
            observacao: data.observacao ?? "",
            createdAt: data.createdAt ?? now,
            updatedAt: data.id ? now : "",
          };

          await postIncome(payload);

          showSnackBar(
            `Provento ${payload.id ? "editado" : "adicionado"} com sucesso!`,
            "success"
          );

          queryClient.invalidateQueries({ queryKey: [KEY_GET_INCOME] });

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
    assets,
    incomeForm,
    submitIncomeForm,
  };
};
