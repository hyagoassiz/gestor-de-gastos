import { ICategoriaApi } from "./ICategoriaApi";

export type ICategoriaPayloadApi = Omit<
  ICategoriaApi,
  "id" | "dataHoraCriacao" | "dataHoraAtualizacao"
> & {
  id: number | undefined;
};
