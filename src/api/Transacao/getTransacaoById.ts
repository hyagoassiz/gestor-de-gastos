import { Transacao } from "@/types";
import { API } from "../constants/api";

export async function getTransacaoById(
  transacaoId: number
): Promise<Transacao> {
  const response = await API.get(`transacoes/${transacaoId}`);

  return response.data;
}
