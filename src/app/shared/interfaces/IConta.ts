import { TypeConta } from ".";

export interface IConta {
  nome: string;
  tipoConta: TypeConta;
  incluirSoma: boolean;
  agencia: string;
  conta: string;
  observacao: string;
  ativo: boolean;
}
