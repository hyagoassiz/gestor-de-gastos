interface IContaApi extends ITimestampableApi {
  id: string;
  nome: string;
  tipo: IContaTypeApi;
  agencia: string;
  conta: string;
  observacao: string;
  incluirEmSomas: boolean;
  ativo: boolean;
}
