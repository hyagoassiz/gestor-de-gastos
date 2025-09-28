import { IContaApi } from "./IContaApi";

export type IContaPayloadApi = Omit<IContaApi, "id"> & {
  id: number | undefined;
};
