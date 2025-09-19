import { EnumCategoriaTypeApi } from "./EnumCategoriaTypeApi";

export interface ICategoriaApi extends ITimestampableApi {
  id: number;
  nome: string;
  tipoCategoria: keyof typeof EnumCategoriaTypeApi;
  observacao: string;
  ativo: boolean;
}
