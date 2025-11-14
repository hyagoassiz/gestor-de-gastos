import { Categoria } from "@/types";
import { API } from "../constants/api";

export async function getCategoriaById(
  categoriaId: string
): Promise<Categoria> {
  const response = await API.get(`categorias/${categoriaId}`);

  return response.data;
}
