import { Conta, ContaParams, PaginatedResponse } from "@/types";
import { API } from "../constants/api";

export async function getContasPaginado(
  params?: ContaParams
): Promise<PaginatedResponse<Conta>> {
  const response = await API.get("/contas/listar-paginado", {
    params,
  });

  return response.data;
}
