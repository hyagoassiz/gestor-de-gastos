import { TypeTransacao } from "./TypeTransacao";

export interface ITransacao {
  id?: string;
  usuario: string;
  data: string;
  tipo: TypeTransacao;
  idCategoria: string;
  nomeCategoria: string;
  idConta: string;
  nomeConta: string;
  conta: string;
  agencia: string;
  valor: number;
  concluido: boolean;
  observacao: string;
  incluirSoma: boolean;
  eTransferencia: boolean;
}
