import { Categoria, CategoriaParamsPaginado } from "@/types";
import { API } from "../constants/API";

export async function getCategoriasPaginado(
  params?: CategoriaParamsPaginado
): Promise<IPaginatedResponse<Categoria>> {
  const response = await API.get("/categorias/listar-paginado", {
    params,
  });

  return response.data;
}
