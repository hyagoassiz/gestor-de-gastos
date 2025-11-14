import { Categoria, CategoriaAtualizarAtivoParams } from "@/types";
import { API } from "../constants/api";

export async function updateStatusCategoria(
  params: CategoriaAtualizarAtivoParams
): Promise<Categoria> {
  const { id, ativo } = params;

  const response = await API.patch(`/categorias/${id}`, null, {
    params: { ativo },
  });

  return response.data;
}
