import { IContaTypeApi } from "./IContaTypeApi";

export interface IContaListPayloadApi {
  ativo?: boolean;
  incluirEmSomas?: boolean;
  tipoConta?: IContaTypeApi["id"];
  textoBusca?: string;
  page?: number;
  size?: number;
}
