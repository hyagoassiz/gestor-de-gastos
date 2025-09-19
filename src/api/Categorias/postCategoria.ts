import { API } from "../constants/API";
import { ICategoriaApi, ICategoriaPayloadApi } from "./interfaces";

export async function postCategoria(
  payload: ICategoriaPayloadApi
): Promise<ICategoriaApi> {
  const response = await API.post("/categorias/salvar", payload);

  return response.data;
}
