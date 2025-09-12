import { API } from "../constants/API";

export async function postConta(payload: IContaPayloadApi): Promise<IContaApi> {
  const response = await API.post("/contas/salvar", payload);

  return response.data;
}
