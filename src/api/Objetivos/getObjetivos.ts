import { Objetivo, ObjetivoParams } from "@/types";
import { API } from "../constants/api";

export async function getObjetivos(
  params?: ObjetivoParams
): Promise<Objetivo[]> {
  const response = await API.get("/objetivos", {
    params,
  });

  return response.data;
}
