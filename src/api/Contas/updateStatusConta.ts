import { Conta, ContaAtualizarAtivoParams } from "@/types";
import { API } from "../constants/API";

export async function updateStatusConta(
  params: ContaAtualizarAtivoParams
): Promise<Conta> {
  const { id, ativo } = params;

  const response = await API.patch(`/contas/${id}`, null, {
    params: { ativo },
  });

  return response.data;
}
