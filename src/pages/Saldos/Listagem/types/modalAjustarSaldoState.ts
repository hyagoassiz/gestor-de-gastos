import { Conta } from "@/types";

export interface ModalAjustarSaldoState {
  isModalOpen: boolean;
  conta: Pick<Conta, "id" | "nome"> | null;
  valorAtual: number;
}
