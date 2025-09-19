import { API } from "../constants/API";
import { ICategoriaApi, ICategoriaListPayloadApi } from "./interfaces";

export async function getCategorias(
  params?: ICategoriaListPayloadApi
): Promise<ICategoriaApi[]> {
  const response = await API.get("/categorias/listar-todos", {
    params,
  });

  return response.data;
}
