import { ICategoriaApi } from "../../Categorias/interfaces";
import { IContaApi } from "../../Contas/interfaces/IContaApi";
import { EnumTipoMotimentacaoApi } from "../../interfaces/EnumTipoMotimentacaoApi";

export interface ITransacaoApi {
  id: number;
  tipoMovimentacao: keyof typeof EnumTipoMotimentacaoApi;
  data: string;
  valor: number;
  observacao: string;
  categoria: ICategoriaApi;
  conta: IContaApi;
  pago: boolean;
}
