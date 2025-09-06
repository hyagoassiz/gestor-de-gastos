import { api } from "../constants/api";

export async function getContas(
  params?: IContaListPayloadApi
): Promise<IContaApi[]> {
  const response = await api.get("/contas/listar-todos", {
    params,
  });

  return response.data;
}
