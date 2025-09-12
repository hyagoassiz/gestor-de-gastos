import { API } from "../constants/API";

export async function getContasPaginado(
  params?: IContaListPayloadApi
): Promise<IPaginatedResponse<IContaApi>> {
  const response = await API.get("/contas/listar-paginado", {
    params,
  });

  return response.data;
}
