import { api } from "../constants/api";

export async function updateStatusConta(
  params: IUpdateStatusContaPayloadApi
): Promise<ICategoriaApi> {
  const { id, ativo } = params;

  const response = await api.patch(`/contas/${id}`, null, {
    params: { ativo },
  });

  return response.data;
}
