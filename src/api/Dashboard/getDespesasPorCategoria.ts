import { DespesaPorCategoria } from "@/types";
import { API } from "../constants/API";

export async function getDespesasPorCategoria(): Promise<
  DespesaPorCategoria[]
> {
  const response = await API.get("dashboard/despesas-por-categoria");

  return response.data;
}
