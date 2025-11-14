import { DespesaPorCategoria } from "@/types";
import { API } from "../constants/api";

export async function getDespesasPorCategoria(): Promise<
  DespesaPorCategoria[]
> {
  const response = await API.get("dashboard/despesas-por-categoria");

  return response.data;
}
