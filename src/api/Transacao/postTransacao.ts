import { Transacao, TransacaoCreateAndUpdatePayload } from "@/types";
import { API } from "../constants/API";

export async function postTransacao(
  body: TransacaoCreateAndUpdatePayload
): Promise<Transacao> {
  const response = await API.post("/transacoes/salvar", body);

  return response.data;
}
