import { TypeCategoria } from "./TypeCategoria";

export interface ICategoria {
  id: number;
  nome: string;
  tipo: TypeCategoria;
  ativo: boolean;
}
