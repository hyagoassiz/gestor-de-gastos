import { Categoria } from "@/types";
import { API } from "../constants/API";

export async function getCategoriaById(
  categoriaId: string
): Promise<Categoria> {
  const response = await API.get(`categorias/${categoriaId}`);

  return response.data;
}
