import { Categoria, CategoriaParams } from "@/types";
import { API } from "../constants/api";

export async function getCategorias(
  params?: CategoriaParams
): Promise<Categoria[]> {
  const response = await API.get("/categorias", {
    params,
  });

  return response.data;
}
