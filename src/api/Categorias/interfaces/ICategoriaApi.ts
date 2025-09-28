import { EnumTipoMotimentacaoApi } from "../../interfaces/EnumTipoMotimentacaoApi";

export interface ICategoriaApi {
  id: number;
  nome: string;
  tipoMovimentacao: keyof typeof EnumTipoMotimentacaoApi;
  observacao: string;
  ativo: boolean;
}
