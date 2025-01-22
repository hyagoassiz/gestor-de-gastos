import { TypeCategoria } from "./TypeCategoria";

export interface ITransacao {
  id: string;
  usuario: string;
  data: string;
  tipo: TypeCategoria;
  idCategoria: string;
  nomeCategoria: string;
  idConta: string;
  nomeConta: string;
  conta: string;
  agencia: string;
  valor: number;
  concluido: boolean;
  incluirSoma: boolean;
}
