interface IProventoPayloadApi extends ITimestampableApi {
  id?: string;
  dataPagamento: string;
  ativoId: string;
  tipoProventoId: IProventoTypeApi["id"];
  total: number;
  observacao: string;
}
