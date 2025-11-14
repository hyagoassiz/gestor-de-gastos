import { Usuario, UsuarioCreatePayload } from "@/types";
import { API } from "../constants/api";

export async function postCriarConta(
  payload: UsuarioCreatePayload
): Promise<Usuario> {
  const response = await API.post("/usuarios/criar-conta", payload);

  return response.data;
}
