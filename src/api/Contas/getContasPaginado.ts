import { Conta, ContaParams, PaginatedResponse } from "@/types";
import { API } from "../constants/API";

export async function getContasPaginado(
  params?: ContaParams
): Promise<PaginatedResponse<Conta>> {
  const response = await API.get("/contas/listar-paginado", {
    params,
  });

  return response.data;
}
