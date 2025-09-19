import { API } from "../constants/API";
import { ICategoriaApi, ICategoriaListPayloadApi } from "./interfaces";

export async function getCategoriasPaginado(
  params?: ICategoriaListPayloadApi
): Promise<IPaginatedResponse<ICategoriaApi>> {
  const response = await API.get("/categorias/listar-paginado", {
    params,
  });

  return response.data;
}
