import { Categoria, CategoriaCreateAndUpdatePayload } from "@/types";
import { API } from "../constants/api";

export async function postCategoria(
  body: CategoriaCreateAndUpdatePayload
): Promise<Categoria> {
  const response = await API.post("/categorias", body);

  return response.data;
}
