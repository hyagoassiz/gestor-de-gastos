import { EnumTipoMovimentacao } from "@/types/enums/tipoMovimentacao.enum";
import { Categoria } from "@/types/categoria";
import { Conta } from "@/types/conta";
import { Pagination } from "@/types/pagination";

export interface Transacao {
  id: number;
  tipoMovimentacao: keyof typeof EnumTipoMovimentacao;
  data: string;
  valor: number;
  categoria: Categoria;
  conta: Conta;
  observacao: string;
  pago: boolean;
}

export type TransacaoCreateAndUpdatePayload = Omit<Transacao, "id"> & {
  id: number | undefined;
};

export type TransacaoParams = Partial<
  Pick<Transacao, "pago" | "tipoMovimentacao">
>;

export type TransacaoParamsPaginado = TransacaoParams & Partial<Pagination>;

export type TransacaoAtualizarPagoParams = Pick<Transacao, "id" | "pago">;
