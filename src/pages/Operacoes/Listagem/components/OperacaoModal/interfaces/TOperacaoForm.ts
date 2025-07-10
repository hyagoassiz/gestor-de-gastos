export type TOperacaoForm = Omit<IOperacaoPayloadApi, "ativoId"> & {
  ativo: IAssetResponseApi;
};
