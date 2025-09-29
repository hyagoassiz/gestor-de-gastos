import { EnumTipoMovimentacao } from "@/types/enums/tipoMovimentacao.enum";
import { Pagination } from "@/types/pagination";

export interface Categoria {
  id: number;
  nome: string;
  tipoMovimentacao: keyof typeof EnumTipoMovimentacao;
  observacao: string;
  ativo: boolean;
}

export type CategoriaCreateAndUpdatePayload = Omit<Categoria, "id"> & {
  id: number | undefined;
};

export type CategoriaParams = Partial<
  Pick<Categoria, "tipoMovimentacao" | "ativo">
> & {
  textoBusca?: string;
};

export type CategoriaParamsPaginado = CategoriaParams & Pagination;

export type CategoriaAtualizarAtivoParams = Pick<Categoria, "id" | "ativo">;
