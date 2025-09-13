import { API } from "../constants/API";

export async function postRegistarUsuario(
  payload: IUsuarioPayloadApi
): Promise<IUsuarioApi> {
  const response = await API.post("/usuarios/criar-conta", payload);

  return response.data;
}
