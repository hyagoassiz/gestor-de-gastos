import { API } from "../constants/API";
import { IContaApi } from "./interfaces/IContaApi";
import { IContaListPayloadApi } from "./interfaces/IContaListPayloadApi";

export async function getContas(
  params?: IContaListPayloadApi
): Promise<IContaApi[]> {
  const response = await API.get("/contas", {
    params,
  });

  return response.data;
}
