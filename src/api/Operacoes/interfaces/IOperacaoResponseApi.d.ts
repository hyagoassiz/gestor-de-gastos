type IOperacaoResponseApi = Omit<IOperacaoPayloadApi, "id" | "ativoId"> & {
  id: string;
  ativo: IAtivoResponseApi | null;
};
