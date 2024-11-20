import { TypeCategoria } from "./TypeCategoria";

export interface ICategoria {
  usuario: string;
  nome: string;
  tipo: TypeCategoria;
  ativo: boolean;
}
