import { EnumTipoContaApi } from "./EnumTipoContaApi";

export interface IContaListPayloadApi {
  ativo?: boolean;
  incluirEmSomas?: boolean;
  tipoConta?: keyof typeof EnumTipoContaApi;
  textoBusca?: string;
  page?: number;
  size?: number;
}
