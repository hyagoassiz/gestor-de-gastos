import { api } from "../constants/api";

export async function postCategoria(
  payload: ICategoriaPayloadApi
): Promise<ICategoriaApi> {
  const response = await api.post("/categorias/salvar", payload);

  return response.data;
}
