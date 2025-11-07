import { Conta } from "@/types";

export interface ModalTransferirSaldoForm {
  contaOrigem: Conta;
  contaDestino: Conta;
  valor: number;
}
