import { ITransacaoApi } from "./ITransacaoApi";

export type ITransacaoPayloadApi = Omit<
  ITransacaoApi,
  "id" | "dataHoraCriacao" | "dataHoraAtualizacao" | "categoria" | "conta"
> & {
  id: number | undefined;
  categoria: { id: number };
  conta: { id: number };
};
