type IOperacaoResponseApi = Omit<IOperacaoPayloadApi, "id" | "ativoId"> & {
  id: string;
  ativo: IAssetResponseApi | null;
};
