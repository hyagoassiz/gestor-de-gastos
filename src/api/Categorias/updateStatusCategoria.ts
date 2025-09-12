import { API } from "../constants/API";

export async function updateStatusCategoria(
  params: IUpdateStatusCategoriaPayloadApi
): Promise<ICategoriaApi> {
  const { id, ativo } = params;

  const response = await API.patch(`/categorias/${id}`, null, {
    params: { ativo },
  });

  return response.data;
}
