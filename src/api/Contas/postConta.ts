import { API } from "../constants/API";
import { IContaApi } from "./interfaces/IContaApi";

export async function postConta(payload: IContaPayloadApi): Promise<IContaApi> {
  const response = await API.post("/contas", payload);

  return response.data;
}
