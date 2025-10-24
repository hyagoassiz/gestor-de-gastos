import { EnumTipoMovimentacao } from "@/types/enums/tipoMovimentacao.enum";
import { Pagination } from "@/types/pagination";

export interface Categoria {
  id: number;
  nome: string;
  tipoMovimentacao: keyof typeof EnumTipoMovimentacao;
  observacao: string;
  ativo: boolean;
  padrao: boolean;
}

export type CategoriaCreateAndUpdatePayload = Omit<
  Categoria,
  "id" | "padrao"
> & {
  id: number | undefined;
};

export type CategoriaParams = Partial<
  Pick<Categoria, "tipoMovimentacao" | "ativo" | "padrao">
> & {
  textoBusca?: string;
};

export type CategoriaParamsPaginado = Partial<CategoriaParams> &
  Partial<Pagination>;

export type CategoriaAtualizarAtivoParams = Pick<Categoria, "id" | "ativo">;
