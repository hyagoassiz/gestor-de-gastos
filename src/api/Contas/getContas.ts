import { API } from "../constants/API";

export async function getContas(
  params?: IContaListPayloadApi
): Promise<IContaApi[]> {
  const response = await API.get("/contas/listar-todos", {
    params,
  });

  return response.data;
}
