import { DespesaPorCategoria, Totais, TransacaoMensal } from "@/types";
import { api } from "../constants/api";

export const dashboardApi = {
  listarDespesasPorCategoria: async (): Promise<DespesaPorCategoria[]> => {
    const response = await api.get("/dashboard/despesas-por-categoria");
    return response.data;
  },

  listarTotaisGerais: async (): Promise<Totais> => {
    const response = await api.get("/dashboard/totais");
    return response.data;
  },

  listarTransacoesMensais: async (): Promise<TransacaoMensal[]> => {
    const response = await api.get("/dashboard/mensal");
    return response.data;
  },
};
