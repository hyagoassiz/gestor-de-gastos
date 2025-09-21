import { API } from "../constants/API";
import { ITransacaoApi, ITransacaoPayloadApi } from "./interfaces";

export async function postTransacao(
  payload: ITransacaoPayloadApi
): Promise<ITransacaoApi> {
  const response = await API.post("/transacoes/salvar", payload);

  return response.data;
}
