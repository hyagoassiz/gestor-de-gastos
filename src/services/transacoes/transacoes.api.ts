import {
  PaginatedResponse,
  Transacao,
  TransacaoCreateAndUpdatePayload,
  TransacaoParams,
  TransacaoParamsPaginado,
} from "@/types";
import { api } from "../constants/api";

export const transacoesApi = {
  listar: async (params?: TransacaoParams): Promise<Transacao[]> => {
    const response = await api.get("/transacoes", { params });
    return response.data;
  },

  listarPaginado: async (
    params: TransacaoParamsPaginado
  ): Promise<PaginatedResponse<Transacao>> => {
    const response = await api.get("/transacoes/listar-paginado", { params });
    return response.data;
  },

  obterPorId: async (id: number): Promise<Transacao> => {
    const response = await api.get(`/transacoes/${id}`);
    return response.data;
  },

  criar: async (body: TransacaoCreateAndUpdatePayload): Promise<Transacao> => {
    const response = await api.post("/transacoes", body);
    return response.data;
  },

  excluir: async (id: number): Promise<void> => {
    const response = await api.delete(`/transacoes/${id}`);
    return response.data;
  },
};
