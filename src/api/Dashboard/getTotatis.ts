import { Totais } from "@/types";
import { API } from "../constants/api";

export async function getTotais(): Promise<Totais> {
  const response = await API.get("dashboard/totais");

  return response.data;
}
