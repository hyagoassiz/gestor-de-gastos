import { Conta, ContaCreateAndUpdatePayload } from "@/types";
import { API } from "../constants/API";

export async function postConta(
  payload: ContaCreateAndUpdatePayload
): Promise<Conta> {
  const response = await API.post("/contas", payload);

  return response.data;
}
