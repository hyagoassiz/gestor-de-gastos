import { Transacao, TransacaoParams } from "@/types";
import { API } from "../constants/api";

export async function getTransacoes(
  params?: TransacaoParams
): Promise<Transacao[]> {
  const response = await API.get("/transacoes", {
    params,
  });

  return response.data;
}
