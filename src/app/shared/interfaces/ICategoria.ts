import { TypeTransacao } from "./TypeTransacao";

export interface ICategoria {
  id: string;
  usuario: string;
  nome: string;
  tipo: TypeTransacao;
  ativo: boolean;
}
