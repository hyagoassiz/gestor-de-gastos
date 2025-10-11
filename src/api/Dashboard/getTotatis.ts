import { Totais } from "@/types";
import { API } from "../constants/API";

export async function getTotais(): Promise<Totais> {
  const response = await API.get("dashboard/totais");

  return response.data;
}
