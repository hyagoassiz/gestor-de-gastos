import { TransacaoMensal } from "@/types";
import { API } from "../constants/api";

export async function getTransacaoMensal(): Promise<TransacaoMensal[]> {
  const response = await API.get("dashboard/mensal");

  return response.data;
}
