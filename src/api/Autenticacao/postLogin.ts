import { UsuarioLoginPayload, UsuarioToken } from "@/types/usuario";
import { API } from "../constants/API";

export async function postLogin(
  payload: UsuarioLoginPayload
): Promise<UsuarioToken> {
  const response = await API.post("/usuarios/login", payload);

  return response.data;
}
