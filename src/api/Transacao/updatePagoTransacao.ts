import { Transacao, TransacaoAtualizarPagoParams } from "@/types";
import { API } from "../constants/API";

export async function updatePagoTransacao(
  params: TransacaoAtualizarPagoParams
): Promise<Transacao> {
  const { id, pago } = params;

  const response = await API.patch(`/transacoes/${id}`, null, {
    params: { pago },
  });

  return response.data;
}
