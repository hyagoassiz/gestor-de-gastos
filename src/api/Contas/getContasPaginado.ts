import { Conta, ContaParams } from "@/types";
import { API } from "../constants/API";

export async function getContasPaginado(
  params?: ContaParams
): Promise<IPaginatedResponse<Conta>> {
  const response = await API.get("/contas/listar-paginado", {
    params,
  });

  return response.data;
}
