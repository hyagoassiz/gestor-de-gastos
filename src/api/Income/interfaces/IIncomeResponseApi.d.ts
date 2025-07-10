type IIncomeResponseApi = Omit<
  IIncomePayloadApi,
  "id" | "ativoId" | "tipoProventoId"
> & {
  id: string;
  tipoProvento: IIncomeTypeApi;
  ativo: IAssetResponseApi | null;
};
