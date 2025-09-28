import { EnumTipoContaApi } from "./EnumTipoContaApi";

export interface IContaApi {
  id: number;
  nome: string;
  tipoConta: keyof typeof EnumTipoContaApi;
  agencia: string;
  conta: string;
  observacao: string;
  incluirEmSomas: boolean;
  ativo: boolean;
}
