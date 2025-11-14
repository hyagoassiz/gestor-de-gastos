import { Categoria, CategoriaParamsPaginado, PaginatedResponse } from "@/types";
import { API } from "../constants/api";

export async function getCategoriasPaginado(
  params?: CategoriaParamsPaginado
): Promise<PaginatedResponse<Categoria>> {
  const response = await API.get("/categorias/listar-paginado", {
    params,
  });

  return response.data;
}
