import { API } from "../constants/API";

export async function postCategoria(
  payload: ICategoriaPayloadApi
): Promise<ICategoriaApi> {
  const response = await API.post("/categorias/salvar", payload);

  return response.data;
}
