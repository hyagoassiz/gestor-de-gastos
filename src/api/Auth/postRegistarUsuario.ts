import { API } from "../constants/API";

export async function postRegistarUsuario(
  payload: IUsuarioPayloadApi
): Promise<IUsuarioApi> {
  const response = await API.post("/usuarios/cadastrar", payload);

  return response.data;
}
