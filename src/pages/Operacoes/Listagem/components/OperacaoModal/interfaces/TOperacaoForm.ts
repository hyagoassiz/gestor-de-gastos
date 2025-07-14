export type TOperacaoForm = Omit<
  IOperacaoPayloadApi,
  "ativoId" | "tipoOperacaoId"
> & {
  ativo: IAtivoResponseApi;
  tipoOperacao: ITipoOperacaoApi;
};
