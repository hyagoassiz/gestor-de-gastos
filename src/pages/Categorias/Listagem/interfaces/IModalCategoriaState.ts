import { Categoria } from "@/types";

export interface IModalCategoriaState {
  open: boolean;
  categoria: Categoria | undefined;
}
