interface IIncomeResponseApi extends ITimestampableApi {
  id: string;
  dataRecebimento: string;
  ativo: IAssetResponseApi | null;
  tipoProvento: IIncomeTypeApi;
  valor: number;
  observacao: string;
}
