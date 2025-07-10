export type TIncomeForm = Omit<
  IIncomePayloadApi,
  "ativoId" | "tipoProvento"
> & {
  tipoProvento: IIncomeTypeApi;
  ativo: IAssetResponseApi;
};
