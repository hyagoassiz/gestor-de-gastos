import { ICategoriaApi } from "./ICategoriaApi";

export type ICategoriaPayloadApi = Omit<ICategoriaApi, "id"> & {
  id: number | undefined;
};
