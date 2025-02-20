import { IConta } from "../../../../shared/interfaces";

export interface IModalTransferirForm {
  data: string;
  valor: number;
  contaOrigem: IConta;
  contaDestino: IConta;
}
