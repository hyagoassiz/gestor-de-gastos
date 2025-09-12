import { API } from "../constants/API";

export async function updateStatusConta(
  params: IUpdateStatusContaPayloadApi
): Promise<ICategoriaApi> {
  const { id, ativo } = params;

  const response = await API.patch(`/contas/${id}`, null, {
    params: { ativo },
  });

  return response.data;
}
