import { TypeConta } from ".";

export interface IConta {
  id: string;
  usuario: string;
  nome: string;
  tipoConta: TypeConta;
  incluirSoma: boolean;
  agencia: string;
  conta: string;
  observacao: string;
  ativo: boolean;
}
