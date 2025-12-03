import { API } from "../constants/api";

export async function deleteObjetivo(idObjetivo: number): Promise<void> {
  const response = await API.delete(`/objetivos/${idObjetivo}`);

  return response.data;
}
