import { EnumTipoMovimentacao } from "@/types/enums";
import { ITransacaoPayloadApi } from "../../../../../../api/Transacao/interfaces";

export type ITransacaoForm = Omit<ITransacaoPayloadApi, "tipoMovimentacao"> & {
  tipoMovimentacao: { id: keyof typeof EnumTipoMovimentacao; nome: string };
};
