interface ICategoriaApi extends ITimestampableApi {
  id: number;
  nome: string;
  tipoCategoria: ICategoriaTypeApi["id"];
  observacao: string;
  ativo: boolean;
}
