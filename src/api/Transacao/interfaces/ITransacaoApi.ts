import { ICategoriaApi } from "../../Categorias/interfaces";
import { EnumTipoMotimentacaoApi } from "../../interfaces/EnumTipoMotimentacaoApi";

export interface ITransacaoApi extends ITimestampableApi {
  id: number;
  tipoMovimentacao: keyof typeof EnumTipoMotimentacaoApi;
  data: string;
  valor: number;
  observacao: string;
  categoria: ICategoriaApi;
  conta: IContaApi;
  pago: boolean;
}
