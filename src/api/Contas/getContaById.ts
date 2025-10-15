import { Conta } from "@/types";
import { API } from "../constants/API";

export async function getContaById(contaId: string): Promise<Conta> {
  const response = await API.get(`contas/${contaId}`);

  return response.data;
}
