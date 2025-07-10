type IIncomeResponseApi = Omit<
  IIncomePayloadApi,
  "id" | "ativoId" | "tipoProvento"
> & {
  id: string;
  tipoProvento: IIncomeTypeApi;
  ativo: IAssetResponseApi | null;
};
