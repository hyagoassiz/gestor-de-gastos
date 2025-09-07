import { api } from "../constants/api";

export async function getCategoriasPaginado(
  params?: ICategoriaListPayloadApi
): Promise<IPaginatedResponse<ICategoriaApi>> {
  const response = await api.get("/categorias/listar-paginado", {
    params,
  });

  return response.data;
}
