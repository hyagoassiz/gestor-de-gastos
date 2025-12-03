import { Conta } from ".";

export interface Objetivo {
  id: number;
  nome: string;
  valor: number;
  valorAtual: number;
  percentual: number;
  dataConclusao: string;
  observacao: string;
}

export type ObjetivoCreateAndUpdatePayload = Omit<Objetivo, "id" | "conta"> & {
  id: number | undefined;
  conta: Conta;
};

export interface ObjetivoParams {
  textoBusca?: string;
}
