import { Conta, ContaParams } from "@/types";
import { API } from "../constants/API";

export async function getContas(params?: ContaParams): Promise<Conta[]> {
  const response = await API.get("/contas", {
    params,
  });

  return response.data;
}
