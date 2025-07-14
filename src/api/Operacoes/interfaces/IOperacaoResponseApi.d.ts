type IOperacaoResponseApi = Omit<
  IOperacaoPayloadApi,
  "id" | "ativoId" | "tipoOperacaoId"
> & {
  id: string;
  ativo: IAtivoResponseApi | null;
  tipoOperacao: ITipoOperacaoApi;
};
