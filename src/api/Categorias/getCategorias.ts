import { API } from "../constants/API";

export async function getCategorias(
  params?: ICategoriaListPayloadApi
): Promise<ICategoriaApi[]> {
  const response = await API.get("/categorias/listar-todos", {
    params,
  });

  return response.data;
}
