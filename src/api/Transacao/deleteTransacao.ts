import { API } from "../constants/API";
import { ITransacaoApi } from "./interfaces";

export async function deleteTransacao(
  idTransacao: number
): Promise<ITransacaoApi> {
  const response = await API.delete(`/transacoes/${idTransacao}`);

  return response.data;
}
