interface IAtivoPayloadApi extends ITimestampableApi {
  id?: string;
  nome: string;
  sigla: string;
  tipo: IAtivoTypeApi;
  observacao: string;
  ativo?: boolean;
}
