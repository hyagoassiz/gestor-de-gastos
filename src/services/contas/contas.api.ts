import {
  AjustarSaldoContaPayload,
  Conta,
  ContaAtualizarAtivoParams,
  ContaCreateAndUpdatePayload,
  ContaParams,
  ContaParamsPaginado,
  PaginatedResponse,
  SaldoConta,
  SaldoContaParams,
  TransferirSaldoPayload,
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

  listarSaldos: async (params?: SaldoContaParams): Promise<SaldoConta[]> => {
    const response = await api.get("/contas/saldos", { params });
    return response.data;
  },

  obterPorId: async (id: number): Promise<Conta> => {
    const response = await api.get(`/contas/${id}`);
    return response.data;
  },

  criar: async (body: ContaCreateAndUpdatePayload): Promise<Conta> => {
    const response = await api.post("/contas", body);
    return response.data;
  },

  transferirSaldo: async (body: TransferirSaldoPayload): Promise<void> => {
    const response = await api.post("/contas/transferir", body);
    return response.data;
  },

  ajustarSaldo: async (body: AjustarSaldoContaPayload): Promise<void> => {
    const response = await api.post("/contas/ajustar-saldo", body);
    return response.data;
  },

  atualizarStatus: async (
    params: ContaAtualizarAtivoParams
  ): Promise<Conta> => {
    const { id, ativo } = params;
    const response = await api.patch(`/contas/${id}`, null, {
      params: { ativo },
    });
    return response.data;
  },
};
