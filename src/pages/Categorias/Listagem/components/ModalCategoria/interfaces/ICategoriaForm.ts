import { Categoria } from "@/types";
import { EnumTipoMovimentacao } from "@/types/enums";

export type ICategoriaForm = Omit<Categoria, "tipoMovimentacao"> & {
  tipoMovimentacao: {
    id: keyof typeof EnumTipoMovimentacao;
    nome: EnumTipoMovimentacao;
  };
};
