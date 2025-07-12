type IProventoResponseApi = Omit<
  IProventoPayloadApi,
  "id" | "ativoId" | "tipoProventoId"
> & {
  id: string;
  tipoProvento: IProventoTypeApi;
  ativo: IAtivoResponseApi | null;
};
