import { API } from "../constants/API";
import { ITransacaoApi, ITransacaoListPayloadApi } from "./interfaces";

export async function getTransacoesPaginado(
  params?: ITransacaoListPayloadApi
): Promise<IPaginatedResponse<ITransacaoApi>> {
  const response = await API.get("/transacoes/listar-paginado", {
    params,
  });

  return response.data;
}
