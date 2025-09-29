import { Transacao, TransacaoCreateAndUpdatePayload } from "@/types";
import { API } from "../constants/API";

export async function postTransacao(
  payload: TransacaoCreateAndUpdatePayload
): Promise<Transacao> {
  const response = await API.post("/transacoes/salvar", payload);

  return response.data;
}
