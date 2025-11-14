import { SaldoConta, SaldoContaParams } from "@/types";
import { API } from "../constants/api";

export async function getSaldosContas(
  params?: SaldoContaParams
): Promise<SaldoConta[]> {
  const response = await API.get("contas/saldos", {
    params,
  });

  return response.data;
}
