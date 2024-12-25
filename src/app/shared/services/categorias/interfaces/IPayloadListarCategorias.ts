import { TypeCategoria } from "../../../interfaces";

export interface IPayloadListarCategorias {
  tipo: TypeCategoria[];
  ativo: boolean[];
  nome?: string;
}
