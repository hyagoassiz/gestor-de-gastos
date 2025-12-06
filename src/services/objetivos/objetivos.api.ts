import {
  Objetivo,
  ObjetivoCreateAndUpdatePayload,
  ObjetivoParams,
} from "@/types";
import { api } from "../constants/api";

export const objetivosApi = {
  listar: async (params?: ObjetivoParams): Promise<Objetivo[]> => {
    const response = await api.get("/objetivos", { params });
    return response.data;
  },

  obterPorId: async (id: number): Promise<Objetivo> => {
    const response = await api.get(`/objetivos/${id}`);
    return response.data;
  },

  criar: async (body: ObjetivoCreateAndUpdatePayload): Promise<Objetivo> => {
    const response = await api.post("/objetivos", body);
    return response.data;
  },

  excluir: async (id: number): Promise<void> => {
    const response = await api.delete(`/objetivos/${id}`);
    return response.data;
  },
};
