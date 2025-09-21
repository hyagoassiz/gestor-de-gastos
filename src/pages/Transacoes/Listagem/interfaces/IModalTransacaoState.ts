import { ITransacaoApi } from "../../../../api/Transacao/interfaces";

export interface IModalTransacaoState {
  open: boolean;
  transacao: ITransacaoApi | null;
}
