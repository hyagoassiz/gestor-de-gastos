import { TransferirSaldoPayload } from "@/types";
import { API } from "../constants/API";

export async function postTransferir(
  body: TransferirSaldoPayload
): Promise<void> {
  return await API.post("/contas/transferir", body);
}
