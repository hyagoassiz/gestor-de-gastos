import { Transacao } from "@/types";

export interface IModalTransacaoState {
  open: boolean;
  transacao: Transacao | null;
}
