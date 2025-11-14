import { UsuarioLoginPayload, UsuarioToken } from "@/types";
import { API } from "../constants/api";

export async function postLogin(
  payload: UsuarioLoginPayload
): Promise<UsuarioToken> {
  const response = await API.post("/usuarios/login", payload);

  return response.data;
}
