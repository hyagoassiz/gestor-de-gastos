interface IAssetPayloadApi extends Partial<ITimestampableApi> {
  id?: string;
  nome: string;
  sigla: string;
  tipo: IAssetTypeApi;
  observacao: string;
  ativo?: boolean;
}
