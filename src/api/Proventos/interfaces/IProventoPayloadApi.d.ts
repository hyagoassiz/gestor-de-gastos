interface IProventoPayloadApi extends ITimestampableApi {
  id?: string;
  dataPagamento: string;
  ativoId: string;
  tipoProventoId: IProventoTypeApi["id"];
  quantidade: number;
  precoUnitario: number;
  total: number;
  observacao: string;
}
