import { Usuario, UsuarioCreatePayload } from "@/types/usuario";
import { API } from "../constants/API";

export async function postCriarConta(
  payload: UsuarioCreatePayload
): Promise<Usuario> {
  const response = await API.post("/usuarios/criar-conta", payload);

  return response.data;
}
