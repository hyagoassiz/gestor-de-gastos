import {
  EnumTipoMotimentacaoApi,
  ICategoriaApi,
} from "../../../../../../api/Categorias/interfaces";

export type ICategoriaForm = Omit<ICategoriaApi, "tipoMovimentacao"> & {
  tipoMovimentacao: {
    id: keyof typeof EnumTipoMotimentacaoApi;
    nome: EnumTipoMotimentacaoApi;
  };
};
