import { SaldoConta, SaldoContaParams } from "@/types";
import { API } from "../constants/API";

export async function getSaldosContas(
  params?: SaldoContaParams
): Promise<SaldoConta[]> {
  const response = await API.get("contas/saldos", {
    params,
  });

  return response.data;
}
