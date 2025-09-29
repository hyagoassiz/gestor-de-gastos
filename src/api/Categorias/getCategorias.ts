import { Categoria, CategoriaParams } from "@/types";
import { API } from "../constants/API";

export async function getCategorias(
  params?: CategoriaParams
): Promise<Categoria[]> {
  const response = await API.get("/categorias/listar-todos", {
    params,
  });

  return response.data;
}
