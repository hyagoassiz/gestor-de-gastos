import { Pagination } from "@/types/pagination";
import { EnumTipoConta } from "@/types/enums/tipoConta.enum";

export interface Conta {
  id: number;
  nome: string;
  tipoConta: keyof typeof EnumTipoConta;
  agencia: string;
  conta: string;
  observacao: string;
  incluirEmSomas: boolean;
  ativo: boolean;
}

export type ContaCreateAndUpdatePayload = Omit<Conta, "id"> & {
  id: number | undefined;
};

export interface ContaParams
  extends Pagination,
    Partial<Pick<Conta, "ativo" | "incluirEmSomas" | "tipoConta">> {
  textoBusca?: string;
}

export type ContaAtualizarAtivoParams = Pick<Conta, "id" | "ativo">;
