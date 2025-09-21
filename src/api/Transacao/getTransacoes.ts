import { API } from "../constants/API";
import { ITransacaoApi, ITransacaoListPayloadApi } from "./interfaces";

export async function getTransacoes(
  params?: ITransacaoListPayloadApi
): Promise<ITransacaoApi[]> {
  const response = await API.get("/transacoes/listar-todos", {
    params,
  });

  return response.data;
}
