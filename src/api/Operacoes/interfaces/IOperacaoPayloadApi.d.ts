interface IOperacaoPayloadApi extends ITimestampableApi {
  id?: string;
  dataOperacao: string;
  ativoId: string;
  tipoOperacao: ITipoOperacaoApi;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  observacao: string;
}
