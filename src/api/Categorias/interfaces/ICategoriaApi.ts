import { EnumTipoMotimentacaoApi } from "../../interfaces/EnumTipoMotimentacaoApi";

export interface ICategoriaApi extends ITimestampableApi {
  id: number;
  nome: string;
  tipoMovimentacao: keyof typeof EnumTipoMotimentacaoApi;
  observacao: string;
  ativo: boolean;
}
