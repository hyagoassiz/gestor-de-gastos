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

export type TransacaoCreateAndUpdatePayload = Omit<
  Transacao,
  "id" | "categoria" | "conta"
> & {
  id: number | undefined;
  categoria: { id: number };
  conta: { id: number };
};

export type TransacaoParams = Partial<Pick<Transacao, "pago">>;

export type TransacaoParamsPaginado = TransacaoParams & Pagination;

export type TransacaoAtualizarPagoParams = Pick<Transacao, "id" | "pago">;
