import { Objetivo, ObjetivoCreateAndUpdatePayload } from "@/types";
import { API } from "../constants/api";

export async function postObjetivo(
  body: ObjetivoCreateAndUpdatePayload
): Promise<Objetivo> {
  const response = await API.post("/objetivos", body);

  return response.data;
}
