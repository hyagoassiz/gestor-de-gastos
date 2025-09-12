import { API } from "../constants/API";

export async function postLoginUsuario(
  payload: Omit<IUsuarioPayloadApi, "nome">
): Promise<{ token: string }> {
  const response = await API.post("/usuarios/login", payload);

  return response.data;
}
