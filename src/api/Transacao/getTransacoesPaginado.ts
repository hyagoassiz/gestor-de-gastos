import { Transacao, TransacaoParamsPaginado } from "@/types";
import { API } from "../constants/API";

export async function getTransacoesPaginado(
  params?: TransacaoParamsPaginado
): Promise<IPaginatedResponse<Transacao>> {
  const response = await API.get("/transacoes/listar-paginado", {
    params,
  });

  return response.data;
}
