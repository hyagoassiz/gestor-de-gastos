import { API } from "../constants/API";
import { IContaApi } from "./interfaces/IContaApi";
import { IContaListPayloadApi } from "./interfaces/IContaListPayloadApi";

export async function getContasPaginado(
  params?: IContaListPayloadApi
): Promise<IPaginatedResponse<IContaApi>> {
  const response = await API.get("/contas/listar-paginado", {
    params,
  });

  return response.data;
}
