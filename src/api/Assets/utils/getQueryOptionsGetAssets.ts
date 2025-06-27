import { UseQueryOptions } from "@tanstack/react-query";
import { getAssets } from "../getAssets";

export const KEY_GET_ASSETS = "key-get-assets" as const;

export function getQueryOptionsGetAssets(
  payload?: IAssetListPayloadApi
): UseQueryOptions<IAssetResponseApi[]> {
  const assets: UseQueryOptions<IAssetResponseApi[]> = {
    queryKey: [KEY_GET_ASSETS, payload],
    queryFn: () => getAssets(payload),
  };

  return assets;
}
