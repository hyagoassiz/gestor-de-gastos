interface IOperacaoPayloadApi extends ITimestampableApi {
  id?: string;
  dataOperacao: string;
  ativoId: string;
  tipoOperacaoId: ITipoOperacaoApi["id"];
  quantidade: number;
  precoUnitario: number;
  total: number;
  observacao: string;
}
