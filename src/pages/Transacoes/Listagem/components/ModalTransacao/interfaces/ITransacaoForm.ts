import { TransacaoCreateAndUpdatePayload } from "@/types";
import { EnumTipoMovimentacao } from "@/types/enums";

export type ITransacaoForm = Omit<
  TransacaoCreateAndUpdatePayload,
  "tipoMovimentacao"
> & {
  tipoMovimentacao: { id: keyof typeof EnumTipoMovimentacao; nome: string };
};
