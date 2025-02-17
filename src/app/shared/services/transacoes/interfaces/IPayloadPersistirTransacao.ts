import { ITransacao } from "../../../interfaces";

export type IPayloadPersistirTransacao = Omit<
  ITransacao,
  | "usuario"
  | "nomeCategoria"
  | "nomeConta"
  | "conta"
  | "incluirSoma"
  | "agencia"
>;
