import { api } from "../constants/api";

export async function getCategorias(
  params?: ICategoriaListPayloadApi
): Promise<ICategoriaApi[]> {
  const response = await api.get("/categorias/listar-todos", {
    params,
  });

  return response.data;
}
