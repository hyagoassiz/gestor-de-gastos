import {
  Categoria,
  CategoriaAtualizarAtivoParams,
  CategoriaCreateAndUpdatePayload,
  CategoriaParams,
  CategoriaParamsPaginado,
  PaginatedResponse,
} from "@/types";
import { api } from "../constants/api";

export const categoriasApi = {
  listar: async (params?: CategoriaParams): Promise<Categoria[]> => {
    const response = await api.get("/categorias", { params });
    return response.data;
  },

  listarPaginado: async (
    params?: CategoriaParamsPaginado
  ): Promise<PaginatedResponse<Categoria>> => {
    const response = await api.get("/categorias/listar-paginado", { params });
    return response.data;
  },

  obterPorId: async (id: number): Promise<Categoria> => {
    const response = await api.get(`/categorias/${id}`);
    return response.data;
  },

  criar: async (
    payload: CategoriaCreateAndUpdatePayload
  ): Promise<Categoria> => {
    const response = await api.post("/categorias", payload);
    return response.data;
  },

  atualizarStatus: async (
    params: CategoriaAtualizarAtivoParams
  ): Promise<Categoria> => {
    const { id, ativo } = params;
    const response = await api.patch(`/categorias/${id}`, null, {
      params: { ativo },
    });
    return response.data;
  },
};
