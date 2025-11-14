import { Transacao, TransacaoCreateAndUpdatePayload } from "@/types";
import { API } from "../constants/api";

export async function postTransacao(
  body: TransacaoCreateAndUpdatePayload
): Promise<Transacao> {
  const response = await API.post("/transacoes", body);

  return response.data;
}
