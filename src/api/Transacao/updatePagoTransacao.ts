import { API } from "../constants/API";
import { ITransacaoApi, IUpdatePagoTransacaoPayloadApi } from "./interfaces";

export async function updatePagoTransacao(
  params: IUpdatePagoTransacaoPayloadApi
): Promise<ITransacaoApi> {
  const { id, pago } = params;

  const response = await API.patch(`/transacoes/${id}`, null, {
    params: { pago },
  });

  return response.data;
}
