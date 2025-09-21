import {
  EnumTipoMotimentacaoApi,
  ITransacaoPayloadApi,
} from "../../../../../../api/Transacao/interfaces";

export type ITransacaoForm = Omit<ITransacaoPayloadApi, "tipoMovimentacao"> & {
  tipoMovimentacao: { id: keyof typeof EnumTipoMotimentacaoApi; nome: string };
};
