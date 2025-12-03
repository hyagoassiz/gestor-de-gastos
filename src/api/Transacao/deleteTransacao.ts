import { API } from "../constants/api";

export async function deleteTransacao(idTransacao: number): Promise<void> {
  const response = await API.delete(`/transacoes/${idTransacao}`);

  return response.data;
}
