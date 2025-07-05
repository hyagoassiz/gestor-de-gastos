import { useNotification } from "../../../../../../hooks/useNotification";
import { useLoading } from "../../../../../../hooks/useLoading";
import { useQueryClient } from "@tanstack/react-query";
import { updateAssetStatus } from "../../../../../../api/Assets/updateAssetStatus";
import { KEY_GET_ASSETS } from "../../../../../../api/Assets/utils/getQueryOptionsGetAssets";

export interface IUseDeactivateModalProps {
  asset: IAssetResponseApi | null;
  onClose(): void;
}

export interface IUseDeactivateModalReturn {
  submit(): Promise<void>;
}

export const useDeactivateModal = ({
  asset,
  onClose,
}: IUseDeactivateModalProps): IUseDeactivateModalReturn => {
  const { showSnackBar } = useNotification();

  const { setLoading } = useLoading();

  const queryClient = useQueryClient();

  async function submit(): Promise<void> {
    if (!asset) {
      return;
    }

    try {
      setLoading(true);

      await updateAssetStatus({ id: asset?.id, ativo: false });

      queryClient.invalidateQueries({ queryKey: [KEY_GET_ASSETS] });

      showSnackBar("Ativo inativado com sucesso", "success");

      onClose();
    } catch (error) {
      console.error(error);
      showSnackBar(String(error), "error");
    } finally {
      setLoading(false);
    }
  }

  return {
    submit,
  };
};
