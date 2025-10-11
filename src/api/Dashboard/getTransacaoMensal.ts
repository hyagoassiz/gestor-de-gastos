import { TransacaoMensal } from "@/types";
import { API } from "../constants/API";

export async function getTransacaoMensal(): Promise<TransacaoMensal[]> {
  const response = await API.get("dashboard/mensal");

  return response.data;
}
