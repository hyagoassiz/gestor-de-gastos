import { ResumoDashboard } from "@/types";
import { API } from "../constants/API";

export async function getResumoDashboard(): Promise<ResumoDashboard> {
  const response = await API.get("dashboard/resumo");

  return response.data;
}
