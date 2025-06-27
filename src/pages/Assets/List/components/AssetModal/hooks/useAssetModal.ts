import { useForm, UseFormReturn } from "react-hook-form";
import { useLoading } from "../../../../../../hooks/useLoading";
import { useNotification } from "../../../../../../hooks/useNotification";
import dayjs from "dayjs";
import { postAsset } from "../../../../../../api/Assets/postAsset";
import { useEffect } from "react";
import { KEY_GET_ASSETS } from "../../../../../../api/Assets/utils/getQueryOptionsGetAssets";
import { useQueryClient } from "@tanstack/react-query";

interface IUseAssetModalProps {
  asset: IAssetResponseApi | null;
  onClose(): void;
}

interface IUseAssetModalReturn {
  assetForm: UseFormReturn<IAssetPayloadApi>;
  submitAssetForm(): void;
}

export const useAssetModal = ({
  asset,
  onClose,
}: IUseAssetModalProps): IUseAssetModalReturn => {
  const assetForm = useForm<IAssetPayloadApi>();

  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (asset) {
      (Object.keys(asset) as (keyof IAssetResponseApi)[]).forEach((key) => {
        assetForm.setValue(
          key as keyof IAssetPayloadApi,
          asset[key] as IAssetResponseApi[keyof IAssetResponseApi]
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asset]);

  function submitAssetForm(): void {
    assetForm.handleSubmit(
      async (data) => {
        try {
          setLoading(true);

          const now = dayjs().toISOString();

          const payload: IAssetPayloadApi = {
            ...data,
            id: data.id ?? undefined,
            observacao: data.observacao ?? "",
            createdAt: data.createdAt ?? now,
            updatedAt: data.id ? now : "",
          };

          await postAsset(payload);

          showSnackBar(
            `Ativo ${payload.id ? "editado" : "adicionado"} com sucesso!`,
            "success"
          );

          queryClient.invalidateQueries({ queryKey: [KEY_GET_ASSETS] });

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
    assetForm,
    submitAssetForm,
  };
};
