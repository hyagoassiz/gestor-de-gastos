import { Transacao } from "@/types";
import { API } from "../constants/API";

export async function deleteTransacao(idTransacao: number): Promise<Transacao> {
  const response = await API.delete(`/transacoes/${idTransacao}`);

  return response.data;
}
