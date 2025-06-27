import { Dispatch, SetStateAction, useMemo, useState } from "react";
import {
  getQueryOptionsGetAssets,
  KEY_GET_ASSETS,
} from "../../../../api/Assets/utils/getQueryOptionsGetAssets";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IAssetModalState, IDeactivateModalState } from "../interfaces";
import { useLoading } from "../../../../hooks/useLoading";
import { updateAssetStatus } from "../../../../api/Assets/updateAssetStatus";
import { useNotification } from "../../../../hooks/useNotification";
import { useForm, UseFormReturn } from "react-hook-form";

interface IUseList {
  assets: IAssetResponseApi[] | undefined;
  assetModalState: IAssetModalState;
  deactivateModalState: IDeactivateModalState;
  filterForm: UseFormReturn<IAssetListPayloadApi>;
  filterCount: number;
  closeAssetModal(): void;
  closeDeactivateModal(): void;
  handleActivateAsset(asset: IAssetResponseApi): Promise<void>;
  handleDeactivateAsset(asset: IAssetResponseApi): void;
  handleEditAsset(asset: IAssetResponseApi): void;
  handleSubmitFilterForm(): void;
  openAssetModal(): void;
  setAssetListPayload: Dispatch<SetStateAction<IAssetListPayloadApi>>;
}

export const useList = (): IUseList => {
  const [assetModalState, setAssetModalState] = useState<IAssetModalState>({
    asset: null,
    open: false,
  });

  const [deactivateModalState, setDeactivateModalState] =
    useState<IDeactivateModalState>({
      asset: null,
      open: false,
    });

  const [assetListPayload, setAssetListPayload] =
    useState<IAssetListPayloadApi>({ ativo: true });

  const filterForm = useForm<IAssetListPayloadApi>({
    defaultValues: { ativo: !assetListPayload.ativo },
  });

  const queryGetAssets = useQuery({
    ...getQueryOptionsGetAssets(assetListPayload),
  });

  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryClient = useQueryClient();

  const filterCount: number = assetListPayload.ativo === true ? 0 : 1;

  const assets = useMemo(() => {
    return queryGetAssets.data;
  }, [queryGetAssets.data]);

  function openAssetModal(): void {
    setAssetModalState({ asset: null, open: true });
  }

  function closeAssetModal(): void {
    setAssetModalState({ asset: null, open: false });
  }

  function closeDeactivateModal(): void {
    setDeactivateModalState({ asset: null, open: false });
  }

  async function handleActivateAsset(asset: IAssetResponseApi): Promise<void> {
    try {
      setLoading(true);

      await updateAssetStatus({ id: asset?.id, ativo: true });

      queryClient.invalidateQueries({ queryKey: [KEY_GET_ASSETS] });

      showSnackBar("Ativo ativado com sucesso!", "success");
    } catch (error) {
      console.error(error);
      showSnackBar(String(error), "error");
    } finally {
      setLoading(false);
    }
  }

  function handleDeactivateAsset(asset: IAssetResponseApi): void {
    setDeactivateModalState({ asset, open: true });
  }

  function handleEditAsset(asset: IAssetResponseApi): void {
    setAssetModalState({ asset, open: true });
  }

  function handleSubmitFilterForm(): void {
    filterForm.handleSubmit((data) => {
      setAssetListPayload({ ativo: !data.ativo });
    })();
  }

  return {
    assets,
    assetModalState,
    deactivateModalState,
    filterForm,
    filterCount,
    closeAssetModal,
    closeDeactivateModal,
    handleActivateAsset,
    handleEditAsset,
    handleDeactivateAsset,
    handleSubmitFilterForm,
    openAssetModal,
    setAssetListPayload,
  };
};
