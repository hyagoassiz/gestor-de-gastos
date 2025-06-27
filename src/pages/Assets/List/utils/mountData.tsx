import { MenuItem } from "@mui/material";
import { MoreOptions } from "../../../../components/MoreOptions";
import { PowerIcon } from "../../../../components/PowerIcon";

interface IMountData {
  assets: IAssetResponseApi[] | undefined;
  handleActivateAsset(asset: IAssetResponseApi): Promise<void>;
  handleDeactivateAsset(asset: IAssetResponseApi): void;
  handleEditAsset(asset: IAssetResponseApi): void;
}

export function mountData({
  assets,
  handleActivateAsset,
  handleEditAsset,
  handleDeactivateAsset,
}: IMountData): any[] {
  if (assets?.length) {
    return assets.map((asset) => ({
      ...asset,
      tipo: asset?.tipo.nome,
      options: (
        <>
          {asset.ativo ? (
            <MoreOptions>
              <MenuItem
                onClick={() => {
                  handleEditAsset(asset);
                }}
              >
                Editar
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleDeactivateAsset(asset);
                }}
              >
                Inativar
              </MenuItem>
            </MoreOptions>
          ) : (
            <PowerIcon onClick={() => handleActivateAsset(asset)} />
          )}
        </>
      ),
    }));
  }
  return [];
}
