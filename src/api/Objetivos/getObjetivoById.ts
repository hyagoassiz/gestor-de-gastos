import { Objetivo } from "@/types";
import { API } from "../constants/api";

export async function getObjetivoById(objetivoId: number): Promise<Objetivo> {
  const response = await API.get(`objetivos/${objetivoId}`);

  return response.data;
}
