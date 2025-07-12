export type TProventoForm = Omit<
  IProventoPayloadApi,
  "ativoId" | "tipoProvento"
> & {
  tipoProvento: IProventoTypeApi;
  ativo: IAtivoResponseApi;
};
