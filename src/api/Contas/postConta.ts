import { Conta, ContaCreateAndUpdatePayload } from "@/types";
import { API } from "../constants/api";

export async function postConta(
  body: ContaCreateAndUpdatePayload
): Promise<Conta> {
  const response = await API.post("/contas", body);

  return response.data;
}
