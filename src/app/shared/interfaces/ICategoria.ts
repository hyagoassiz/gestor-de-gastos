import { TypeCategoria } from "./TypeCategoria";

export interface ICategoria {
  id: string;
  usuario: string;
  nome: string;
  tipo: TypeCategoria;
  ativo: boolean;
}
