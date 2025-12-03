import {
  Conta,
  ContaAtualizarAtivoParams,
  ContaCreateAndUpdatePayload,
  ContaParams,
  ContaParamsPaginado,
  PaginatedResponse,
} from "@/types";
import { api } from "../constants/api";

export const contasApi = {
  listar: async (params?: ContaParams): Promise<Conta[]> => {
    const response = await api.get("/contas", { params });
    return response.data;
  },

  listarPaginado: async (
    params?: ContaParamsPaginado
  ): Promise<PaginatedResponse<Conta>> => {
    const response = await api.get("/contas/listar-paginado", { params });
    return response.data;
  },

  obterPorId: async (id: number): Promise<Conta> => {
    const response = await api.get(`/contas/${id}`);
    return response.data;
  },

  criar: async (payload: ContaCreateAndUpdatePayload): Promise<Conta> => {
    const response = await api.post("/contas", payload);
    return response.data;
  },

  atualizarStatus: async (
    params: ContaAtualizarAtivoParams
  ): Promise<Conta> => {
    const { id, ativo } = params;
    const response = await api.patch(`contas/${id}`, null, {
      params: { ativo },
    });
    return response.data;
  },
};
