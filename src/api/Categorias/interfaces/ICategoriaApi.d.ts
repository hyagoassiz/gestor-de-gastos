interface ICategoriaApi extends ITimestampableApi {
  id: string;
  nome: string;
  tipo: ICategoriaTypeApi;
  observacao: string;
  ativo: boolean;
}
