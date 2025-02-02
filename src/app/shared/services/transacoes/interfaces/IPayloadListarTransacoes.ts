import { TypeCategoria } from "../../../interfaces";

export interface IPayloadListarTransacoes {
  tipo: TypeCategoria[];
  concluido: boolean[];
}
