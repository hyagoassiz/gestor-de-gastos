export type TIncomeForm = Omit<IIncomePayloadApi, "ativoId"> & {
  ativo: IAssetResponseApi;
};
