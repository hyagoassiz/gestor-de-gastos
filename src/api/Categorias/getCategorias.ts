import { Categoria, CategoriaParams } from "@/types";
import { API } from "../constants/API";

export async function getCategorias(
  params?: CategoriaParams
): Promise<Categoria[]> {
  const response = await API.get("/categorias", {
    params,
  });

  return response.data;
}
