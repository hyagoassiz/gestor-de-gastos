import { ITransacao } from "../../../../shared/interfaces";

export type ITransacaoForm = Omit<
  ITransacao,
  | "usuario"
  | "nomeCategoria"
  | "nomeConta"
  | "conta"
  | "agencia"
  | "incluirSoma"
>;
