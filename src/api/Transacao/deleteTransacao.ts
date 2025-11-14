import { Transacao } from "@/types";
import { API } from "../constants/api";

export async function deleteTransacao(idTransacao: number): Promise<Transacao> {
  const response = await API.delete(`/transacoes/${idTransacao}`);

  return response.data;
}
