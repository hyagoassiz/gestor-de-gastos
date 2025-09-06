import { api } from "../constants/api";

export async function updateStatusCategoria(
  params: IUpdateStatusCategoriaPayloadApi
): Promise<ICategoriaApi> {
  const { id, ativo } = params;

  const response = await api.patch(`/categorias/${id}`, null, {
    params: { ativo },
  });

  return response.data;
}
