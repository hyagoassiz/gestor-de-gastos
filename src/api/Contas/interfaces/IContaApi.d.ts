interface IContaApi extends ITimestampableApi {
  id: number;
  nome: string;
  tipoConta: IContaTypeApi["id"];
  agencia: string;
  conta: string;
  observacao: string;
  incluirEmSomas: boolean;
  ativo: boolean;
}
