import { api } from "../constants/api";

export async function postConta(payload: IContaPayloadApi): Promise<IContaApi> {
  const response = await api.post("/contas/salvar", payload);

  return response.data;
}
