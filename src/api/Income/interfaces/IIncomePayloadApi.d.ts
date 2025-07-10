interface IIncomePayloadApi extends ITimestampableApi {
  id?: string;
  dataPagamento: string;
  ativoId: string;
  tipoProventoId: IIncomeTypeApi["id"];
  quantidade: number;
  precoUnitario: number;
  total: number;
  observacao: string;
}
