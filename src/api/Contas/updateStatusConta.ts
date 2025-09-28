import { API } from "../constants/API";
import { IContaApi } from "./interfaces/IContaApi";
import { IUpdateStatusContaPayloadApi } from "./interfaces/IUpdateStatusContaPayloadApi";

export async function updateStatusConta(
  params: IUpdateStatusContaPayloadApi
): Promise<IContaApi> {
  const { id, ativo } = params;

  const response = await API.patch(`/contas/${id}`, null, {
    params: { ativo },
  });

  return response.data;
}
