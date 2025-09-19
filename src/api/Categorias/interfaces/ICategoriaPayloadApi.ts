import { ICategoriaApi } from "./ICategoriaApi";

export type ICategoriaPayloadApi = Omit<
  ICategoriaApi,
  "id" | "criadoEm" | "atualizadoEm"
> & {
  id: number | undefined;
};
