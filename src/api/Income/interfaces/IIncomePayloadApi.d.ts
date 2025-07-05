interface IIncomePayloadApi extends Partial<ITimestampableApi> {
  id?: string;
  dataRecebimento: string;
  ativoId: string;
  tipoProvento: IIncomeTypeApi;
  valor: number;
  observacao: string;
}
