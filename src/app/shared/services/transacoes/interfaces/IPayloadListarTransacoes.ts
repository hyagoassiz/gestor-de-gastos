import { TypeTransacao } from "../../../interfaces";

export interface IPayloadListarTransacoes {
  tipo: TypeTransacao[];
  concluido: boolean[];
}
