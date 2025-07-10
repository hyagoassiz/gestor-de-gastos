interface IOperacaoPayloadApi extends ITimestampableApi {
  id?: string;
  dataOperacao: string;
  ativoId: string;
  tipoOperacao: ITipoOperacaoApi;
  quantidade: number;
  precoUnitario: number;
  total: number;
  observacao: string;
}
