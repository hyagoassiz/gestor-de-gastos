import { Transacao, TransacaoParams } from "@/types";
import { API } from "../constants/API";

export async function getTransacoes(
  params?: TransacaoParams
): Promise<Transacao[]> {
  const response = await API.get("/transacoes/listar-todos", {
    params,
  });

  return response.data;
}
