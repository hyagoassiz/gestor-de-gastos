import { PaginatedResponse, Transacao, TransacaoParamsPaginado } from "@/types";
import { API } from "../constants/api";

export async function getTransacoesPaginado(
  params?: TransacaoParamsPaginado
): Promise<PaginatedResponse<Transacao>> {
  const response = await API.get("/transacoes/listar-paginado", {
    params,
  });

  return response.data;
}
